<?php
// Plantilla de configuración privada para Covent Garden Bilbao (/fotos)
// Para configurar manualmente la contraseña de Josu sin pasar por el asistente web:
// 1. Copia este archivo como "config.local.php" en la carpeta "fotos/".
// 2. Genera un hash seguro ejecutando: php -r 'echo password_hash("TuContraseña", PASSWORD_DEFAULT);'
// 3. Pega el hash resultante en 'admin_password_hash'.

if (!defined('COVENT_FOTOS_APP')) {
    http_response_code(403);
    exit('Acceso directo no permitido.');
}

return [
    // Pega aquí el hash generado para la contraseña
    'admin_password_hash' => '',
];
