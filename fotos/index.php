<?php
// Gestor Mínimo de Fotografías · Covent Garden Bilbao (/fotos)
// Diseñado para que Josu sustituya y añada fotografías fácilmente desde el móvil o el ordenador.

define('COVENT_FOTOS_APP', true);

// Configuración de cookies de sesión seguras
$isSecure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443);
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/fotos',
    'domain' => '',
    'secure' => $isSecure,
    'httponly' => true,
    'samesite' => 'Lax'
]);
session_start();

$config = require __DIR__ . '/config.php';

// Asegurar directorios requeridos
if (!is_dir($config['path_backups'])) {
    @mkdir($config['path_backups'], 0755, true);
}
if (!is_dir($config['path_uploads'])) {
    @mkdir($config['path_uploads'], 0755, true);
}
if (!is_dir(dirname($config['path_data']))) {
    @mkdir(dirname($config['path_data']), 0755, true);
}

// Generar token anti-CSRF si no existe
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// -------------------------------------------------------------
// CONTROL DE FUERZA BRUTA PERSISTENTE POR IP (ENTRE SESIONES)
// -------------------------------------------------------------
function get_client_ip_hash() {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    return hash('sha256', $ip . '_covent_salt');
}

function check_ip_lockout($rateLimitFile, $config) {
    if (!file_exists($rateLimitFile)) {
        return null;
    }
    $raw = @file_get_contents($rateLimitFile);
    $data = json_decode($raw, true) ?: [];
    $ipHash = get_client_ip_hash();

    if (!isset($data[$ipHash])) {
        return null;
    }

    $entry = $data[$ipHash];
    $now = time();
    $diff = $now - ($entry['last'] ?? 0);

    if (($entry['count'] ?? 0) >= $config['rate_limit_attempts'] && $diff < $config['rate_limit_lockout']) {
        return ceil(($config['rate_limit_lockout'] - $diff) / 60);
    }
    return null;
}

function record_failed_ip_attempt($rateLimitFile, $config) {
    $data = [];
    if (file_exists($rateLimitFile)) {
        $raw = @file_get_contents($rateLimitFile);
        $data = json_decode($raw, true) ?: [];
    }

    $ipHash = get_client_ip_hash();
    $now = time();
    $entry = $data[$ipHash] ?? ['count' => 0, 'last' => 0];

    // Reiniciar recuento si el tiempo de bloqueo ya expiró
    if (($now - $entry['last']) > $config['rate_limit_lockout']) {
        $entry['count'] = 0;
    }

    $entry['count']++;
    $entry['last'] = $now;
    $data[$ipHash] = $entry;

    // Purgar registros antiguos (> 24h)
    foreach ($data as $k => $v) {
        if (($now - ($v['last'] ?? 0)) > 86400) {
            unset($data[$k]);
        }
    }

    @file_put_contents($rateLimitFile, json_encode($data), LOCK_EX);
}

function reset_ip_failed_attempts($rateLimitFile) {
    if (!file_exists($rateLimitFile)) {
        return;
    }
    $raw = @file_get_contents($rateLimitFile);
    $data = json_decode($raw, true) ?: [];
    $ipHash = get_client_ip_hash();

    if (isset($data[$ipHash])) {
        unset($data[$ipHash]);
        @file_put_contents($rateLimitFile, json_encode($data), LOCK_EX);
    }
}

// -------------------------------------------------------------
// MANEJO DE MANIFIESTO Y SUBIDAS
// -------------------------------------------------------------
function get_media_manifest($path) {
    if (!file_exists($path)) {
        return null;
    }
    $content = file_get_contents($path);
    return json_decode($content, true);
}

function save_media_manifest($path, $data) {
    $data['version'] = time();
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    return file_put_contents($path, $json, LOCK_EX) !== false;
}

function validate_upload($file, $config) {
    if (!isset($file['error']) || is_array($file['error'])) {
        return 'Parámetros de subida inválidos.';
    }
    if ($file['error'] !== UPLOAD_ERR_OK) {
        switch ($file['error']) {
            case UPLOAD_ERR_INI_SIZE:
            case UPLOAD_ERR_FORM_SIZE:
                return 'El archivo supera el tamaño máximo permitido por el servidor.';
            case UPLOAD_ERR_PARTIAL:
                return 'La subida se interrumpió a mitad. Inténtalo de nuevo.';
            case UPLOAD_ERR_NO_FILE:
                return 'No se seleccionó ningún archivo.';
            default:
                return 'Error de subida desconocido (' . $file['error'] . ').';
        }
    }
    if ($file['size'] > $config['max_upload_bytes']) {
        return 'La imagen es demasiado pesada. El límite es de 15 MB.';
    }

    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $config['allowed_extensions'], true)) {
        return 'Formato de archivo no admitido (solo JPG, PNG o WebP).';
    }

    $mime = '';
    if (function_exists('finfo_open')) {
        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mime = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);
    } elseif (function_exists('mime_content_type')) {
        $mime = mime_content_type($file['tmp_name']);
    }

    if ($mime && !in_array($mime, $config['allowed_mimes'], true)) {
        return 'El contenido del archivo no corresponde a una imagen válida (' . htmlspecialchars($mime) . ').';
    }

    return null;
}

function process_and_save_image($tmpFile, $destFile, $maxDimension, $config) {
    $destDir = dirname($destFile);
    if (!is_dir($destDir)) {
        @mkdir($destDir, 0755, true);
    }

    if (!function_exists('imagecreatefromstring')) {
        return move_uploaded_file($tmpFile, $destFile);
    }

    $fileData = file_get_contents($tmpFile);
    if (!$fileData) {
        return move_uploaded_file($tmpFile, $destFile);
    }

    $srcImg = @imagecreatefromstring($fileData);
    if (!$srcImg) {
        return move_uploaded_file($tmpFile, $destFile);
    }

    // Orientación EXIF (móviles iPhone / Android)
    if (function_exists('exif_read_data')) {
        $exif = @exif_read_data($tmpFile);
        if (!empty($exif['Orientation'])) {
            switch ($exif['Orientation']) {
                case 3:
                    $srcImg = imagerotate($srcImg, 180, 0);
                    break;
                case 6:
                    $srcImg = imagerotate($srcImg, -90, 0);
                    break;
                case 8:
                    $srcImg = imagerotate($srcImg, 90, 0);
                    break;
            }
        }
    }

    $origW = imagesx($srcImg);
    $origH = imagesy($srcImg);

    $newW = $origW;
    $newH = $origH;
    if ($origW > $maxDimension || $origH > $maxDimension) {
        if ($origW >= $origH) {
            $newW = $maxDimension;
            $newH = (int)round(($origH / $origW) * $maxDimension);
        } else {
            $newH = $maxDimension;
            $newW = (int)round(($origW / $origH) * $maxDimension);
        }
    }

    $destImg = imagecreatetruecolor($newW, $newH);

    $ext = strtolower(pathinfo($destFile, PATHINFO_EXTENSION));
    if ($ext === 'png' || $ext === 'webp') {
        imagealphablending($destImg, false);
        imagesavealpha($destImg, true);
        $transparent = imagecolorallocatealpha($destImg, 255, 255, 255, 127);
        imagefilledrectangle($destImg, 0, 0, $newW, $newH, $transparent);
    } else {
        $bg = imagecolorallocate($destImg, 255, 255, 255);
        imagefilledrectangle($destImg, 0, 0, $newW, $newH, $bg);
    }

    imagecopyresampled($destImg, $srcImg, 0, 0, 0, 0, $newW, $newH, $origW, $origH);

    $success = false;
    if ($ext === 'webp' && function_exists('imagewebp')) {
        $success = imagewebp($destImg, $destFile, $config['image_quality_webp']);
    } elseif ($ext === 'png' && function_exists('imagepng')) {
        $success = imagepng($destImg, $destFile, 8);
    } else {
        $success = imagejpeg($destImg, $destFile, $config['image_quality_jpeg']);
    }

    imagedestroy($srcImg);
    imagedestroy($destImg);

    if (!$success) {
        return move_uploaded_file($tmpFile, $destFile);
    }
    return true;
}

// -------------------------------------------------------------
// CONTROLADOR DE ACCIONES POST
// -------------------------------------------------------------
$flashMsg = null;
$flashType = 'info';
$isPasswordConfigured = !empty($config['admin_password_hash']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';

    // ACCIÓN: Configuración inicial de contraseña (cuando no existe contraseña previa)
    if ($action === 'setup_password' && !$isPasswordConfigured) {
        $token = $_POST['csrf_token'] ?? '';
        if (!hash_equals($_SESSION['csrf_token'], $token)) {
            $flashMsg = 'Token de seguridad inválido. Recarga la página.';
            $flashType = 'error';
        } else {
            $pass1 = $_POST['new_password'] ?? '';
            $pass2 = $_POST['confirm_password'] ?? '';

            if (strlen($pass1) < 6) {
                $flashMsg = 'La contraseña debe tener al menos 6 caracteres.';
                $flashType = 'error';
            } elseif ($pass1 !== $pass2) {
                $flashMsg = 'Las contraseñas no coinciden. Inténtalo de nuevo.';
                $flashType = 'error';
            } else {
                $hash = password_hash($pass1, PASSWORD_DEFAULT);
                $localConfigContent = "<?php\n// Configuración privada de Covent Garden Bilbao\n"
                    . "if (!defined('COVENT_FOTOS_APP')) { http_response_code(403); exit; }\n"
                    . "return [\n"
                    . "    'admin_password_hash' => " . var_export($hash, true) . ",\n"
                    . "];\n";

                if (file_put_contents($config['path_local_config'], $localConfigContent, LOCK_EX) !== false) {
                    @chmod($config['path_local_config'], 0640);
                    $_SESSION['authenticated'] = true;
                    $_SESSION['flash_msg'] = 'Contraseña configurada con éxito. Ya puedes gestionar las fotografías.';
                    $_SESSION['flash_type'] = 'success';
                    header('Location: ./');
                    exit;
                } else {
                    $flashMsg = 'No se pudo escribir el archivo de configuración en el servidor. Revisa los permisos de escritura.';
                    $flashType = 'error';
                }
            }
        }
    }

    // ACCIÓN: Login con bloqueo persistente entre sesiones por IP
    elseif ($action === 'login' && $isPasswordConfigured) {
        $lockoutMinutes = check_ip_lockout($config['path_rate_limit'], $config);

        if ($lockoutMinutes !== null) {
            $flashMsg = "Demasiados intentos fallidos desde esta conexión. Por seguridad, espera $lockoutMinutes minutos antes de reintentar.";
            $flashType = 'error';
        } else {
            $token = $_POST['csrf_token'] ?? '';
            if (!hash_equals($_SESSION['csrf_token'], $token)) {
                $flashMsg = 'Token de seguridad inválido. Recarga e inténtalo de nuevo.';
                $flashType = 'error';
            } else {
                $password = $_POST['password'] ?? '';
                if (password_verify($password, $config['admin_password_hash'])) {
                    reset_ip_failed_attempts($config['path_rate_limit']);
                    $_SESSION['authenticated'] = true;
                    header('Location: ./');
                    exit;
                } else {
                    record_failed_ip_attempt($config['path_rate_limit'], $config);
                    $lockoutCheck = check_ip_lockout($config['path_rate_limit'], $config);
                    if ($lockoutCheck !== null) {
                        $flashMsg = "Demasiados intentos fallidos. Bloqueado durante $lockoutCheck minutos por seguridad.";
                    } else {
                        $flashMsg = 'Contraseña incorrecta. Inténtalo de nuevo.';
                    }
                    $flashType = 'error';
                }
            }
        }
    }

    // ACCIONES AUTENTICADAS (requieren sesión y token CSRF)
    if (!empty($_SESSION['authenticated'])) {
        $token = $_POST['csrf_token'] ?? '';
        if (!hash_equals($_SESSION['csrf_token'], $token)) {
            $flashMsg = 'Token de seguridad inválido. Recarga la página.';
            $flashType = 'error';
        } else {
            $media = get_media_manifest($config['path_data']);
            if (!$media) {
                $flashMsg = 'Error al leer el archivo de datos media.json.';
                $flashType = 'error';
            } else {
                if ($action === 'logout') {
                    session_destroy();
                    header('Location: ./');
                    exit;
                }

                // Sustituir Foto Individual
                elseif ($action === 'replace_single') {
                    $imageId = $_POST['image_id'] ?? '';
                    if (!isset($media['singleImages'][$imageId])) {
                        $flashMsg = 'Elemento de imagen no encontrado.';
                        $flashType = 'error';
                    } elseif (!isset($_FILES['photo'])) {
                        $flashMsg = 'No se ha recibido ningún archivo.';
                        $flashType = 'error';
                    } else {
                        $err = validate_upload($_FILES['photo'], $config);
                        if ($err) {
                            $flashMsg = $err;
                            $flashType = 'error';
                        } else {
                            $targetRel = $media['singleImages'][$imageId]['current'];
                            $targetAbs = dirname(__DIR__) . '/' . $targetRel;

                            // Crear copia de respaldo previa
                            if (file_exists($targetAbs)) {
                                $ext = pathinfo($targetAbs, PATHINFO_EXTENSION);
                                $backupName = $imageId . '_' . time() . '.' . $ext;
                                $backupAbs = $config['path_backups'] . '/' . $backupName;
                                @copy($targetAbs, $backupAbs);
                                $media['singleImages'][$imageId]['backup'] = $backupName;
                            }

                            $maxDim = (strpos($imageId, 'hero') !== false || strpos($imageId, 'campo') !== false || strpos($imageId, 'barra_fondo') !== false)
                                ? $config['max_dimension_hero']
                                : ((strpos($imageId, 'pintxo') !== false) ? $config['max_dimension_gallery'] : $config['max_dimension_carta']);

                            $ok = process_and_save_image($_FILES['photo']['tmp_name'], $targetAbs, $maxDim, $config);
                            if ($ok) {
                                save_media_manifest($config['path_data'], $media);
                                $flashMsg = "Foto de «{$media['singleImages'][$imageId]['label']}» actualizada correctamente.";
                                $flashType = 'success';
                            } else {
                                $flashMsg = 'No se pudo guardar la imagen procesada en el servidor.';
                                $flashType = 'error';
                            }
                        }
                    }
                }

                // Revertir Foto Individual
                elseif ($action === 'revert_single') {
                    $imageId = $_POST['image_id'] ?? '';
                    $backupName = $media['singleImages'][$imageId]['backup'] ?? null;
                    if (!$backupName) {
                        $flashMsg = 'No existe una copia de seguridad para esta imagen.';
                        $flashType = 'error';
                    } else {
                        $backupAbs = $config['path_backups'] . '/' . $backupName;
                        $targetAbs = dirname(__DIR__) . '/' . $media['singleImages'][$imageId]['current'];

                        if (file_exists($backupAbs) && @copy($backupAbs, $targetAbs)) {
                            $media['singleImages'][$imageId]['backup'] = null;
                            save_media_manifest($config['path_data'], $media);
                            @unlink($backupAbs);
                            $flashMsg = "Foto de «{$media['singleImages'][$imageId]['label']}» restaurada a su versión anterior.";
                            $flashType = 'success';
                        } else {
                            $flashMsg = 'No se pudo restaurar la copia de seguridad.';
                            $flashType = 'error';
                        }
                    }
                }

                // Sustituir Foto de Galería
                elseif ($action === 'replace_galeria') {
                    $itemId = $_POST['item_id'] ?? '';
                    $foundIdx = -1;
                    foreach ($media['galeria'] as $idx => $gItem) {
                        if ($gItem['id'] === $itemId) {
                            $foundIdx = $idx;
                            break;
                        }
                    }

                    if ($foundIdx === -1) {
                        $flashMsg = 'Foto de galería no encontrada.';
                        $flashType = 'error';
                    } else {
                        $err = validate_upload($_FILES['photo'], $config);
                        if ($err) {
                            $flashMsg = $err;
                            $flashType = 'error';
                        } else {
                            $targetRel = $media['galeria'][$foundIdx]['src'];
                            $targetAbs = dirname(__DIR__) . '/' . $targetRel;

                            if (file_exists($targetAbs)) {
                                $ext = pathinfo($targetAbs, PATHINFO_EXTENSION);
                                $backupName = 'galeria_' . $itemId . '_' . time() . '.' . $ext;
                                $backupAbs = $config['path_backups'] . '/' . $backupName;
                                @copy($targetAbs, $backupAbs);
                                $media['galeria'][$foundIdx]['backup'] = $backupName;
                            }

                            $ok = process_and_save_image($_FILES['photo']['tmp_name'], $targetAbs, $config['max_dimension_gallery'], $config);
                            if ($ok) {
                                save_media_manifest($config['path_data'], $media);
                                $flashMsg = "Foto de galería «{$media['galeria'][$foundIdx]['title']}» actualizada.";
                                $flashType = 'success';
                            } else {
                                $flashMsg = 'Error al procesar la imagen de galería.';
                                $flashType = 'error';
                            }
                        }
                    }
                }

                // Revertir Foto de Galería
                elseif ($action === 'revert_galeria') {
                    $itemId = $_POST['item_id'] ?? '';
                    $foundIdx = -1;
                    foreach ($media['galeria'] as $idx => $gItem) {
                        if ($gItem['id'] === $itemId) {
                            $foundIdx = $idx;
                            break;
                        }
                    }

                    if ($foundIdx !== -1 && !empty($media['galeria'][$foundIdx]['backup'])) {
                        $backupName = $media['galeria'][$foundIdx]['backup'];
                        $backupAbs = $config['path_backups'] . '/' . $backupName;
                        $targetAbs = dirname(__DIR__) . '/' . $media['galeria'][$foundIdx]['src'];

                        if (file_exists($backupAbs) && @copy($backupAbs, $targetAbs)) {
                            $media['galeria'][$foundIdx]['backup'] = null;
                            save_media_manifest($config['path_data'], $media);
                            @unlink($backupAbs);
                            $flashMsg = 'Foto de galería restaurada a su versión anterior.';
                            $flashType = 'success';
                        }
                    }
                }

                // Añadir Foto a la Galería
                elseif ($action === 'add_galeria') {
                    $err = validate_upload($_FILES['photo'], $config);
                    if ($err) {
                        $flashMsg = $err;
                        $flashType = 'error';
                    } else {
                        $title = trim($_POST['title'] ?? '') ?: 'Rincón de Covent Garden';
                        $tag = trim($_POST['tag'] ?? '') ?: 'Dentro de Covent';
                        $ext = strtolower(pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION));
                        $filename = 'galeria_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
                        $targetAbs = $config['path_uploads'] . '/' . $filename;
                        $targetRel = 'images/uploads/' . $filename;

                        $ok = process_and_save_image($_FILES['photo']['tmp_name'], $targetAbs, $config['max_dimension_gallery'], $config);
                        if ($ok) {
                            $media['galeria'][] = [
                                'id' => 'galeria_user_' . time(),
                                'isMain' => false,
                                'src' => $targetRel,
                                'alt' => $title,
                                'tag' => $tag,
                                'title' => $title,
                                'backup' => null,
                                'canDelete' => true
                            ];
                            save_media_manifest($config['path_data'], $media);
                            $flashMsg = 'Nueva fotografía añadida a la galería con éxito.';
                            $flashType = 'success';
                        } else {
                            $flashMsg = 'Error al guardar la nueva fotografía.';
                            $flashType = 'error';
                        }
                    }
                }

                // Eliminar Foto Añadida de la Galería
                elseif ($action === 'delete_galeria') {
                    $itemId = $_POST['item_id'] ?? '';
                    foreach ($media['galeria'] as $idx => $gItem) {
                        if ($gItem['id'] === $itemId && !empty($gItem['canDelete'])) {
                            $targetAbs = dirname(__DIR__) . '/' . $gItem['src'];
                            if (file_exists($targetAbs)) {
                                @unlink($targetAbs);
                            }
                            array_splice($media['galeria'], $idx, 1);
                            save_media_manifest($config['path_data'], $media);
                            $flashMsg = 'Fotografía eliminada de la galería.';
                            $flashType = 'success';
                            break;
                        }
                    }
                }

                // Sustituir Foto de Referencia de Carta
                elseif ($action === 'replace_carta') {
                    $catId = $_POST['category_id'] ?? '';
                    $refId = $_POST['ref_id'] ?? '';

                    if (!isset($media['cartaReferencias'][$catId])) {
                        $flashMsg = 'Categoría de carta no válida.';
                        $flashType = 'error';
                    } else {
                        $foundIdx = -1;
                        foreach ($media['cartaReferencias'][$catId] as $idx => $rItem) {
                            if ($rItem['id'] === $refId) {
                                $foundIdx = $idx;
                                break;
                            }
                        }

                        if ($foundIdx === -1) {
                            $flashMsg = 'Referencia fotográfica no encontrada.';
                            $flashType = 'error';
                        } else {
                            $err = validate_upload($_FILES['photo'], $config);
                            if ($err) {
                                $flashMsg = $err;
                                $flashType = 'error';
                            } else {
                                $targetRel = $media['cartaReferencias'][$catId][$foundIdx]['src'];
                                $targetAbs = dirname(__DIR__) . '/' . $targetRel;

                                if (file_exists($targetAbs)) {
                                    $ext = pathinfo($targetAbs, PATHINFO_EXTENSION);
                                    $backupName = 'carta_' . $catId . '_' . $refId . '_' . time() . '.' . $ext;
                                    $backupAbs = $config['path_backups'] . '/' . $backupName;
                                    @copy($targetAbs, $backupAbs);
                                    $media['cartaReferencias'][$catId][$foundIdx]['backup'] = $backupName;
                                }

                                $ok = process_and_save_image($_FILES['photo']['tmp_name'], $targetAbs, $config['max_dimension_carta'], $config);
                                if ($ok) {
                                    save_media_manifest($config['path_data'], $media);
                                    $flashMsg = "Foto de plato «{$media['cartaReferencias'][$catId][$foundIdx]['title']}» actualizada.";
                                    $flashType = 'success';
                                } else {
                                    $flashMsg = 'Error al procesar la foto del plato.';
                                    $flashType = 'error';
                                }
                            }
                        }
                    }
                }

                // Revertir Foto de Carta
                elseif ($action === 'revert_carta') {
                    $catId = $_POST['category_id'] ?? '';
                    $refId = $_POST['ref_id'] ?? '';

                    if (isset($media['cartaReferencias'][$catId])) {
                        foreach ($media['cartaReferencias'][$catId] as $idx => $rItem) {
                            if ($rItem['id'] === $refId && !empty($rItem['backup'])) {
                                $backupName = $rItem['backup'];
                                $backupAbs = $config['path_backups'] . '/' . $backupName;
                                $targetAbs = dirname(__DIR__) . '/' . $rItem['src'];

                                if (file_exists($backupAbs) && @copy($backupAbs, $targetAbs)) {
                                    $media['cartaReferencias'][$catId][$idx]['backup'] = null;
                                    save_media_manifest($config['path_data'], $media);
                                    @unlink($backupAbs);
                                    $flashMsg = 'Foto de plato restaurada a su versión anterior.';
                                    $flashType = 'success';
                                }
                                break;
                            }
                        }
                    }
                }

                // Añadir Foto a la Carta
                elseif ($action === 'add_carta') {
                    $catId = $_POST['category_id'] ?? '';
                    if (!isset($media['cartaReferencias'][$catId])) {
                        $flashMsg = 'Categoría de carta inválida.';
                        $flashType = 'error';
                    } else {
                        $err = validate_upload($_FILES['photo'], $config);
                        if ($err) {
                            $flashMsg = $err;
                            $flashType = 'error';
                        } else {
                            $title = trim($_POST['title'] ?? '') ?: 'Plato de la Casa';
                            $desc = trim($_POST['desc'] ?? '') ?: 'Elaborado al momento en Covent Garden Bilbao';
                            $badge = trim($_POST['badge'] ?? '') ?: 'Especialidad';

                            $ext = strtolower(pathinfo($_FILES['photo']['name'], PATHINFO_EXTENSION));
                            $filename = 'carta_' . $catId . '_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
                            $targetAbs = $config['path_uploads'] . '/' . $filename;
                            $targetRel = 'images/uploads/' . $filename;

                            $ok = process_and_save_image($_FILES['photo']['tmp_name'], $targetAbs, $config['max_dimension_carta'], $config);
                            if ($ok) {
                                $media['cartaReferencias'][$catId][] = [
                                    'id' => 'ref_user_' . time(),
                                    'title' => $title,
                                    'desc' => $desc,
                                    'badge' => $badge,
                                    'src' => $targetRel,
                                    'backup' => null,
                                    'canDelete' => true
                                ];
                                save_media_manifest($config['path_data'], $media);
                                $flashMsg = "Nueva foto añadida a la categoría «{$catId}».";
                                $flashType = 'success';
                            } else {
                                $flashMsg = 'Error al procesar la nueva imagen de la carta.';
                                $flashType = 'error';
                            }
                        }
                    }
                }

                // Eliminar Foto Añadida de la Carta
                elseif ($action === 'delete_carta') {
                    $catId = $_POST['category_id'] ?? '';
                    $refId = $_POST['ref_id'] ?? '';
                    if (isset($media['cartaReferencias'][$catId])) {
                        foreach ($media['cartaReferencias'][$catId] as $idx => $rItem) {
                            if ($rItem['id'] === $refId && !empty($rItem['canDelete'])) {
                                $targetAbs = dirname(__DIR__) . '/' . $rItem['src'];
                                if (file_exists($targetAbs)) {
                                    @unlink($targetAbs);
                                }
                                array_splice($media['cartaReferencias'][$catId], $idx, 1);
                                save_media_manifest($config['path_data'], $media);
                                $flashMsg = 'Foto eliminada de la carta.';
                                $flashType = 'success';
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
}

if (!empty($_SESSION['flash_msg'])) {
    $flashMsg = $_SESSION['flash_msg'];
    $flashType = $_SESSION['flash_type'] ?? 'info';
    unset($_SESSION['flash_msg'], $_SESSION['flash_type']);
}

$isAuth = !empty($_SESSION['authenticated']);
$media = get_media_manifest($config['path_data']);
$version = $media['version'] ?? time();

$sections = [];
if ($isAuth && !empty($media['singleImages'])) {
    foreach ($media['singleImages'] as $key => $item) {
        $sec = $item['section'] ?? 'Otras Fotografías';
        $sections[$sec][] = $item;
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title><?= htmlspecialchars($config['app_title']) ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #0e1014;
            --surface-color: #171920;
            --surface-subtle: #21242d;
            --border-color: #2b303c;
            --gold: #d4af37;
            --gold-light: #f3cf65;
            --text-main: #f0ede6;
            --text-muted: #9aa1b0;
            --text-dim: #6b7280;
            --crimson: #a62b2b;
            --green: #2e8b57;
            --amber: #d97706;
            --radius: 12px;
            --radius-sm: 8px;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-main);
            min-height: 100vh;
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
        }
        .container { max-width: 1080px; margin: 0 auto; padding: 16px; }

        header.top-bar {
            background: rgba(23, 25, 32, 0.95);
            backdrop-filter: blur(8px);
            border-bottom: 1px solid var(--border-color);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        .header-wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 16px;
            max-width: 1080px;
            margin: 0 auto;
        }
        .brand-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.25rem;
            color: var(--gold);
            letter-spacing: 0.5px;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .brand-badge {
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: 0.7rem;
            background: rgba(212, 175, 55, 0.15);
            color: var(--gold-light);
            border: 1px solid rgba(212, 175, 55, 0.3);
            padding: 2px 8px;
            border-radius: 999px;
            font-weight: 600;
        }
        .header-actions { display: flex; align-items: center; gap: 10px; }
        .btn-link {
            color: var(--text-muted);
            text-decoration: none;
            font-size: 0.85rem;
            padding: 6px 12px;
            border-radius: var(--radius-sm);
            border: 1px solid var(--border-color);
            transition: all 0.2s;
        }
        .btn-link:hover { color: var(--text-main); border-color: var(--gold); }
        .btn-logout {
            background: none;
            border: 1px solid #4a2222;
            color: #e57373;
            cursor: pointer;
            padding: 6px 12px;
            border-radius: var(--radius-sm);
            font-size: 0.85rem;
        }
        .btn-logout:hover { background: rgba(166, 43, 43, 0.2); }

        .flash {
            padding: 14px 18px;
            border-radius: var(--radius-sm);
            margin-bottom: 20px;
            font-size: 0.95rem;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: fadeIn 0.3s ease;
        }
        .flash.success {
            background: rgba(46, 139, 87, 0.18);
            border: 1px solid var(--green);
            color: #98e2b8;
        }
        .flash.error {
            background: rgba(166, 43, 43, 0.18);
            border: 1px solid var(--crimson);
            color: #ff9b9b;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

        .login-wrap {
            min-height: 75vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .login-card {
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            border-radius: var(--radius);
            padding: 32px 28px;
            width: 100%;
            max-width: 420px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .login-card h1 {
            font-family: 'Playfair Display', serif;
            color: var(--gold);
            font-size: 1.6rem;
            margin-bottom: 8px;
        }
        .login-card p {
            color: var(--text-muted);
            font-size: 0.9rem;
            margin-bottom: 24px;
        }
        .form-group {
            margin-bottom: 18px;
            text-align: left;
        }
        .form-group label {
            display: block;
            font-size: 0.82rem;
            font-weight: 600;
            color: var(--text-muted);
            margin-bottom: 6px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .form-input {
            width: 100%;
            padding: 12px 14px;
            background: var(--bg-color);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-sm);
            color: var(--text-main);
            font-size: 1rem;
            outline: none;
            transition: border-color 0.2s;
        }
        .form-input:focus { border-color: var(--gold); }
        .btn-primary {
            width: 100%;
            padding: 14px;
            background: var(--gold);
            color: #121212;
            font-weight: 700;
            font-size: 1rem;
            border: none;
            border-radius: var(--radius-sm);
            cursor: pointer;
            transition: background 0.2s, transform 0.1s;
        }
        .btn-primary:hover { background: var(--gold-light); }
        .btn-primary:active { transform: scale(0.99); }

        .quick-nav {
            display: flex;
            gap: 8px;
            overflow-x: auto;
            padding: 12px 4px 18px 4px;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
        }
        .quick-nav::-webkit-scrollbar { display: none; }
        .nav-pill {
            background: var(--surface-color);
            color: var(--text-muted);
            border: 1px solid var(--border-color);
            padding: 8px 16px;
            border-radius: 999px;
            font-size: 0.85rem;
            font-weight: 600;
            text-decoration: none;
            white-space: nowrap;
            transition: all 0.2s;
        }
        .nav-pill:hover, .nav-pill:active {
            background: var(--surface-subtle);
            color: var(--gold);
            border-color: var(--gold);
        }

        .section-block { margin-bottom: 40px; }
        .section-header {
            margin-bottom: 16px;
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 10px;
        }
        .section-header h2 {
            font-family: 'Playfair Display', serif;
            font-size: 1.35rem;
            color: var(--gold-light);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .section-hint { font-size: 0.8rem; color: var(--text-dim); }

        .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 18px;
        }

        .photo-card {
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            border-radius: var(--radius);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            transition: border-color 0.2s;
        }
        .photo-card:hover { border-color: #404656; }
        .photo-preview {
            width: 100%;
            height: 200px;
            background: #000;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .photo-preview img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
        }
        .photo-preview:hover img { transform: scale(1.02); }
        .photo-info {
            padding: 14px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .photo-title {
            font-weight: 600;
            font-size: 0.95rem;
            margin-bottom: 4px;
            color: var(--text-main);
        }
        .photo-meta {
            font-size: 0.78rem;
            color: var(--text-muted);
            margin-bottom: 14px;
        }
        .photo-meta span { color: var(--gold); }

        .card-actions {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: auto;
        }
        .upload-trigger-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            background: var(--surface-subtle);
            border: 1px solid var(--border-color);
            color: var(--gold-light);
            padding: 10px 14px;
            border-radius: var(--radius-sm);
            font-size: 0.88rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
        }
        .upload-trigger-btn:hover {
            background: var(--gold);
            color: #121212;
            border-color: var(--gold);
        }
        .upload-trigger-btn:active { transform: scale(0.98); }
        .btn-revert {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            background: rgba(217, 119, 6, 0.12);
            border: 1px solid var(--amber);
            color: #fbbf24;
            padding: 8px 12px;
            border-radius: var(--radius-sm);
            font-size: 0.82rem;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            transition: background 0.2s;
        }
        .btn-revert:hover { background: rgba(217, 119, 6, 0.25); }
        .btn-delete {
            background: rgba(166, 43, 43, 0.15);
            border: 1px solid var(--crimson);
            color: #ff9b9b;
            padding: 8px 12px;
            border-radius: var(--radius-sm);
            font-size: 0.82rem;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
        }
        .btn-delete:hover { background: rgba(166, 43, 43, 0.3); }

        .add-box {
            background: var(--surface-color);
            border: 1px dashed var(--gold);
            border-radius: var(--radius);
            padding: 20px;
            margin-top: 14px;
        }
        .add-box h3 {
            font-size: 1rem;
            color: var(--gold);
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .add-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 12px;
        }
        @media (max-width: 600px) {
            .add-grid { grid-template-columns: 1fr; }
            .container { padding: 12px; }
            .cards-grid { grid-template-columns: 1fr; }
            .header-wrap { padding: 10px 12px; }
        }
    </style>
</head>
<body>

<?php if (!$isPasswordConfigured): ?>
    <!-- PANTALLA DE CONFIGURACIÓN INICIAL DE CONTRASEÑA (PRIMER ACCESO) -->
    <div class="login-wrap">
        <div class="login-card">
            <h1>Covent Garden</h1>
            <p>Configuración Inicial del Gestor</p>

            <div style="background: rgba(212, 175, 55, 0.08); border: 1px solid rgba(212, 175, 55, 0.3); border-radius: var(--radius-sm); padding: 12px; margin-bottom: 20px; font-size: 0.85rem; color: var(--gold-light); text-align: left;">
                Establece la contraseña de acceso para Josu. Quedará guardada de forma segura y privada en el servidor, sin incluirse en el código ni en el repositorio.
            </div>

            <?php if ($flashMsg): ?>
                <div class="flash <?= $flashType ?>"><?= htmlspecialchars($flashMsg) ?></div>
            <?php endif; ?>

            <form method="POST" action="">
                <input type="hidden" name="action" value="setup_password">
                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">

                <div class="form-group">
                    <label for="new_password">Nueva Contraseña (mínimo 6 caracteres)</label>
                    <input type="password" id="new_password" name="new_password" class="form-input" placeholder="Elige tu contraseña" required minlength="6" autofocus>
                </div>

                <div class="form-group">
                    <label for="confirm_password">Repetir Contraseña</label>
                    <input type="password" id="confirm_password" name="confirm_password" class="form-input" placeholder="Repite la contraseña" required minlength="6">
                </div>

                <button type="submit" class="btn-primary">Guardar Contraseña y Acceder</button>
            </form>
        </div>
    </div>

<?php elseif (!$isAuth): ?>
    <!-- PANTALLA DE ACCESO HABITUAL -->
    <div class="login-wrap">
        <div class="login-card">
            <h1>Covent Garden</h1>
            <p>Acceso al Gestor Fotográfico</p>

            <?php if ($flashMsg): ?>
                <div class="flash <?= $flashType ?>"><?= htmlspecialchars($flashMsg) ?></div>
            <?php endif; ?>

            <form method="POST" action="">
                <input type="hidden" name="action" value="login">
                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">

                <div class="form-group">
                    <label for="password">Contraseña de Josu</label>
                    <input type="password" id="password" name="password" class="form-input" placeholder="Introduce tu contraseña" required autofocus>
                </div>

                <button type="submit" class="btn-primary">Entrar al Gestor</button>
            </form>
        </div>
    </div>

<?php else: ?>
    <!-- PANEL PRINCIPAL AUTENTICADO -->
    <header class="top-bar">
        <div class="header-wrap">
            <a href="./" class="brand-title">
                Covent Garden
                <span class="brand-badge">Fotos Web</span>
            </a>
            <div class="header-actions">
                <a href="../" target="_blank" class="btn-link">Ver Web ↗</a>
                <form method="POST" action="" style="display:inline;">
                    <input type="hidden" name="action" value="logout">
                    <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">
                    <button type="submit" class="btn-logout">Salir</button>
                </form>
            </div>
        </div>
    </header>

    <div class="container">
        <?php if ($flashMsg): ?>
            <div class="flash <?= $flashType ?>"><?= htmlspecialchars($flashMsg) ?></div>
        <?php endif; ?>

        <!-- Navegación Rápida por Secciones -->
        <nav class="quick-nav">
            <?php foreach ($sections as $secName => $items): ?>
                <a href="#sec-<?= htmlspecialchars(preg_replace('/[^a-z0-9]/i', '-', strtolower($secName))) ?>" class="nav-pill"><?= htmlspecialchars($secName) ?></a>
            <?php endforeach; ?>
            <a href="#sec-galeria" class="nav-pill">Galería "Dentro de Covent"</a>
            <a href="#sec-carta" class="nav-pill">Carta Gastronómica</a>
        </nav>

        <!-- SECCIONES DE FOTOGRAFÍAS INDIVIDUALES -->
        <?php foreach ($sections as $secName => $items): 
            $secId = 'sec-' . preg_replace('/[^a-z0-9]/i', '-', strtolower($secName));
        ?>
            <section id="<?= htmlspecialchars($secId) ?>" class="section-block">
                <div class="section-header">
                    <h2><?= htmlspecialchars($secName) ?></h2>
                    <span class="section-hint"><?= count($items) ?> fotografía(s)</span>
                </div>

                <div class="cards-grid">
                    <?php foreach ($items as $item): ?>
                        <div class="photo-card">
                            <div class="photo-preview">
                                <img src="../<?= htmlspecialchars($item['current']) ?>?v=<?= $version ?>" alt="<?= htmlspecialchars($item['label']) ?>" loading="lazy">
                            </div>
                            <div class="photo-info">
                                <div>
                                    <div class="photo-title"><?= htmlspecialchars($item['label']) ?></div>
                                    <div class="photo-meta">Sugerido: <span><?= htmlspecialchars($item['recommended']) ?></span></div>
                                </div>

                                <div class="card-actions">
                                    <form method="POST" action="" enctype="multipart/form-data" class="replace-form">
                                        <input type="hidden" name="action" value="replace_single">
                                        <input type="hidden" name="image_id" value="<?= htmlspecialchars($item['id']) ?>">
                                        <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">
                                        
                                        <label class="upload-trigger-btn">
                                            <span>📷 Cambiar Foto</span>
                                            <input type="file" name="photo" accept="image/jpeg,image/png,image/webp" style="display:none;" onchange="this.form.submit()">
                                        </label>
                                    </form>

                                    <?php if (!empty($item['backup'])): ?>
                                        <form method="POST" action="">
                                            <input type="hidden" name="action" value="revert_single">
                                            <input type="hidden" name="image_id" value="<?= htmlspecialchars($item['id']) ?>">
                                            <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">
                                            <button type="submit" class="btn-revert" onclick="return confirm('¿Restaurar la foto anterior?')">
                                                ↺ Revertir Foto
                                            </button>
                                        </form>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </section>
        <?php endforeach; ?>

        <!-- SECCIÓN: GALERÍA "DENTRO DE COVENT" -->
        <section id="sec-galeria" class="section-block">
            <div class="section-header">
                <h2>Galería "Dentro de Covent"</h2>
                <span class="section-hint"><?= count($media['galeria'] ?? []) ?> fotos activas</span>
            </div>

            <div class="cards-grid">
                <?php if (!empty($media['galeria'])): ?>
                    <?php foreach ($media['galeria'] as $gItem): ?>
                        <div class="photo-card">
                            <div class="photo-preview">
                                <img src="../<?= htmlspecialchars($gItem['src']) ?>?v=<?= $version ?>" alt="<?= htmlspecialchars($gItem['title']) ?>" loading="lazy">
                            </div>
                            <div class="photo-info">
                                <div>
                                    <div class="photo-title"><?= htmlspecialchars($gItem['title']) ?></div>
                                    <div class="photo-meta">Etiqueta: <span><?= htmlspecialchars($gItem['tag'] ?? 'Covent Garden') ?></span></div>
                                </div>

                                <div class="card-actions">
                                    <form method="POST" action="" enctype="multipart/form-data">
                                        <input type="hidden" name="action" value="replace_galeria">
                                        <input type="hidden" name="item_id" value="<?= htmlspecialchars($gItem['id']) ?>">
                                        <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">
                                        <label class="upload-trigger-btn">
                                            <span>📷 Cambiar Foto</span>
                                            <input type="file" name="photo" accept="image/jpeg,image/png,image/webp" style="display:none;" onchange="this.form.submit()">
                                        </label>
                                    </form>

                                    <?php if (!empty($gItem['backup'])): ?>
                                        <form method="POST" action="">
                                            <input type="hidden" name="action" value="revert_galeria">
                                            <input type="hidden" name="item_id" value="<?= htmlspecialchars($gItem['id']) ?>">
                                            <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">
                                            <button type="submit" class="btn-revert" onclick="return confirm('¿Restaurar la foto anterior?')">
                                                ↺ Revertir Foto
                                            </button>
                                        </form>
                                    <?php endif; ?>

                                    <?php if (!empty($gItem['canDelete'])): ?>
                                        <form method="POST" action="">
                                            <input type="hidden" name="action" value="delete_galeria">
                                            <input type="hidden" name="item_id" value="<?= htmlspecialchars($gItem['id']) ?>">
                                            <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">
                                            <button type="submit" class="btn-delete" onclick="return confirm('¿Eliminar esta fotografía de la galería?')">
                                                🗑 Eliminar Foto
                                            </button>
                                        </form>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>

            <div class="add-box">
                <h3>➕ Añadir Nueva Fotografía a la Galería</h3>
                <form method="POST" action="" enctype="multipart/form-data">
                    <input type="hidden" name="action" value="add_galeria">
                    <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">

                    <div class="add-grid">
                        <div class="form-group" style="margin-bottom:0;">
                            <label>Título descriptivo</label>
                            <input type="text" name="title" class="form-input" placeholder="Ej: Rincones con historia" required>
                        </div>
                        <div class="form-group" style="margin-bottom:0;">
                            <label>Etiqueta temática</label>
                            <input type="text" name="tag" class="form-input" placeholder="Ej: Atmósfera Covent">
                        </div>
                    </div>

                    <div style="margin-top:12px; display:flex; gap:10px; align-items:center;">
                        <input type="file" name="photo" accept="image/jpeg,image/png,image/webp" required style="color:var(--text-muted);">
                        <button type="submit" class="btn-primary" style="width:auto; padding:10px 20px;">Subir a Galería</button>
                    </div>
                </form>
            </div>
        </section>

        <!-- SECCIÓN: CARTA GASTRONÓMICA -->
        <section id="sec-carta" class="section-block">
            <div class="section-header">
                <h2>Carta Gastronómica · Fotografías Reales</h2>
                <span class="section-hint">Referencias visuales por sección</span>
            </div>

            <?php if (!empty($media['cartaReferencias'])): ?>
                <?php foreach ($media['cartaReferencias'] as $catId => $catRefs): 
                    $catNames = [
                        'raciones' => 'Raciones & Para Empezar',
                        'burguers' => 'Burguers & Smash',
                        'pizzas' => 'Pizzas Artesanas',
                        'platos' => 'Platos Combinados',
                        'bocatas-sandwiches' => 'Bocadillos & Sándwiches',
                        'ensaladas' => 'Ensaladas Variadas'
                    ];
                    $displayName = $catNames[$catId] ?? ucfirst($catId);
                ?>
                    <div style="margin-bottom:28px;">
                        <h3 style="font-size:1.1rem; color:var(--gold-light); margin-bottom:12px; padding-left:4px; border-left:3px solid var(--gold); padding-left:8px;">
                            <?= htmlspecialchars($displayName) ?>
                        </h3>

                        <div class="cards-grid">
                            <?php foreach ($catRefs as $rItem): ?>
                                <div class="photo-card">
                                    <div class="photo-preview">
                                        <img src="../<?= htmlspecialchars($rItem['src']) ?>?v=<?= $version ?>" alt="<?= htmlspecialchars($rItem['title']) ?>" loading="lazy">
                                    </div>
                                    <div class="photo-info">
                                        <div>
                                            <div class="photo-title"><?= htmlspecialchars($rItem['title']) ?></div>
                                            <div class="photo-meta">Insignia: <span><?= htmlspecialchars($rItem['badge'] ?? 'Covent') ?></span></div>
                                        </div>

                                        <div class="card-actions">
                                            <form method="POST" action="" enctype="multipart/form-data">
                                                <input type="hidden" name="action" value="replace_carta">
                                                <input type="hidden" name="category_id" value="<?= htmlspecialchars($catId) ?>">
                                                <input type="hidden" name="ref_id" value="<?= htmlspecialchars($rItem['id']) ?>">
                                                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">
                                                <label class="upload-trigger-btn">
                                                    <span>📷 Cambiar Foto</span>
                                                    <input type="file" name="photo" accept="image/jpeg,image/png,image/webp" style="display:none;" onchange="this.form.submit()">
                                                </label>
                                            </form>

                                            <?php if (!empty($rItem['backup'])): ?>
                                                <form method="POST" action="">
                                                    <input type="hidden" name="action" value="revert_carta">
                                                    <input type="hidden" name="category_id" value="<?= htmlspecialchars($catId) ?>">
                                                    <input type="hidden" name="ref_id" value="<?= htmlspecialchars($rItem['id']) ?>">
                                                    <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">
                                                    <button type="submit" class="btn-revert" onclick="return confirm('¿Restaurar la foto anterior?')">
                                                        ↺ Revertir Foto
                                                    </button>
                                                </form>
                                            <?php endif; ?>

                                            <?php if (!empty($rItem['canDelete'])): ?>
                                                <form method="POST" action="">
                                                    <input type="hidden" name="action" value="delete_carta">
                                                    <input type="hidden" name="category_id" value="<?= htmlspecialchars($catId) ?>">
                                                    <input type="hidden" name="ref_id" value="<?= htmlspecialchars($rItem['id']) ?>">
                                                    <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">
                                                    <button type="submit" class="btn-delete" onclick="return confirm('¿Eliminar esta fotografía de la carta?')">
                                                        🗑 Eliminar Foto
                                                    </button>
                                                </form>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>

                        <div class="add-box" style="margin-top:14px;">
                            <h3 style="font-size:0.92rem;">➕ Añadir Foto a «<?= htmlspecialchars($displayName) ?>»</h3>
                            <form method="POST" action="" enctype="multipart/form-data">
                                <input type="hidden" name="action" value="add_carta">
                                <input type="hidden" name="category_id" value="<?= htmlspecialchars($catId) ?>">
                                <input type="hidden" name="csrf_token" value="<?= htmlspecialchars($_SESSION['csrf_token']) ?>">

                                <div class="add-grid">
                                    <div class="form-group" style="margin-bottom:0;">
                                        <label>Nombre del plato</label>
                                        <input type="text" name="title" class="form-input" placeholder="Ej: Smash Doble Cheddar" required>
                                    </div>
                                    <div class="form-group" style="margin-bottom:0;">
                                        <label>Etiqueta / Badge</label>
                                        <input type="text" name="badge" class="form-input" placeholder="Ej: Especialidad">
                                    </div>
                                </div>

                                <div style="margin-top:10px; display:flex; gap:10px; align-items:center;">
                                    <input type="file" name="photo" accept="image/jpeg,image/png,image/webp" required style="color:var(--text-muted);">
                                    <button type="submit" class="btn-primary" style="width:auto; padding:8px 16px; font-size:0.9rem;">Subir Foto</button>
                                </div>
                            </form>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </section>
    </div>
<?php endif; ?>

</body>
</html>
