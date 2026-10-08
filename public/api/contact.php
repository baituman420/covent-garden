<?php
/**
 * Covent Garden Bilbao - Endpoint de Solicitud de Grupos y Reservados
 * Procesa el formulario, valida datos, filtra spam y envía notificación por correo.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Cargar configuración
$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    $configFile = __DIR__ . '/config.sample.php';
}
$config = file_exists($configFile) ? require $configFile : [];

// Permitir CORS controlado
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = $config['security']['allowed_origins'] ?? ['*'];
if (in_array($origin, $allowedOrigins, true) || in_array('*', $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: " . ($origin ?: '*'));
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido. Solo se acepta POST.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// Obtener datos (form-data o json)
$rawInput = file_get_contents('php://input');
$data = [];
if (!empty($rawInput)) {
    $decoded = json_decode($rawInput, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
}
if (empty($data) && !empty($_POST)) {
    $data = $_POST;
}

// 1. Antispam Honeypot
$honeypotKey = $config['security']['honeypot_field'] ?? 'website';
if (!empty($data[$honeypotKey])) {
    // Si el honeypot está relleno, responder éxito aparente para despistar al bot sin enviar nada
    echo json_encode(['success' => true, 'message' => 'Solicitud recibida.'], JSON_UNESCAPED_UNICODE);
    exit;
}

// 2. Control básico de frecuencia (Rate Limiting)
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$cacheDir = sys_get_temp_dir() . '/covent_cache';
if (!is_dir($cacheDir)) {
    @mkdir($cacheDir, 0755, true);
}
$rateFile = $cacheDir . '/rate_' . md5($ip) . '.json';
$now = time();
$rateLimitWindow = $config['security']['rate_limit_seconds'] ?? 600;
$maxRequests = $config['security']['max_requests_per_ip'] ?? 5;

if (file_exists($rateFile)) {
    $rateData = json_decode((string)file_get_contents($rateFile), true);
    if (is_array($rateData) && isset($rateData['timestamp']) && ($now - $rateData['timestamp']) < $rateLimitWindow) {
        if (($rateData['count'] ?? 0) >= $maxRequests) {
            http_response_code(429);
            echo json_encode([
                'success' => false,
                'error' => 'Demasiadas solicitudes. Por favor, espera unos minutos antes de intentarlo de nuevo.'
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
        $rateData['count'] = ($rateData['count'] ?? 0) + 1;
    } else {
        $rateData = ['timestamp' => $now, 'count' => 1];
    }
} else {
    $rateData = ['timestamp' => $now, 'count' => 1];
}
@file_put_contents($rateFile, json_encode($rateData));

// 3. Validación y Saneamiento de Campos
$nombre   = trim(filter_var($data['nombre'] ?? '', FILTER_UNSAFE_RAW));
$email    = trim(filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL));
$telefono = trim(filter_var($data['telefono'] ?? '', FILTER_UNSAFE_RAW));
$fecha    = trim(filter_var($data['fecha'] ?? '', FILTER_UNSAFE_RAW));
$personas = trim(filter_var($data['personas'] ?? '', FILTER_UNSAFE_RAW));
$mensaje  = trim(filter_var($data['mensaje'] ?? '', FILTER_UNSAFE_RAW));

$errores = [];

if (mb_strlen($nombre) < 2 || mb_strlen($nombre) > 120) {
    $errores[] = 'Por favor, introduce tu nombre (entre 2 y 120 caracteres).';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errores[] = 'Por favor, introduce una dirección de correo electrónico válida.';
}

if (!empty($telefono) && mb_strlen($telefono) > 30) {
    $errores[] = 'El teléfono introducido no parece válido.';
}

if (mb_strlen($mensaje) > 2500) {
    $errores[] = 'El mensaje no puede superar los 2500 caracteres.';
}

if (!empty($errores)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => implode(' ', $errores),
        'errores' => $errores
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 4. Modo Desarrollo / Simulación
$isDevMode = !empty($config['dev_mode']) || empty($config['smtp']['password']) || $config['smtp']['password'] === 'TU_CONTRASEÑA_SMTP_AQUI';

if ($isDevMode) {
    // En modo desarrollo, simula respuesta exitosa sin credenciales
    echo json_encode([
        'success' => true,
        'dev_mode' => true,
        'message' => 'Solicitud de información recibida correctamente. (Modo desarrollo: correo no enviado).'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// 5. Envío de Correo en Producción
$recipient = $config['contact']['recipient_email'] ?? 'info@coventgardenbilbao.eus';
$recipientName = $config['contact']['recipient_name'] ?? 'Josu - Covent Garden';
$subjectPrefix = $config['contact']['subject_prefix'] ?? '[Covent Garden Web] ';
$asunto = $subjectPrefix . 'Nueva solicitud de ' . $nombre . (!empty($fecha) ? ' (' . $fecha . ')' : '');

// Cuerpo en texto plano
$bodyPlain = "NUEVA SOLICITUD DE GRUPOS Y RESERVADOS - COVENT GARDEN BILBAO\n";
$bodyPlain .= "===========================================================\n\n";
$bodyPlain .= "Nombre: " . $nombre . "\n";
$bodyPlain .= "Email: " . $email . "\n";
$bodyPlain .= "Teléfono: " . ($telefono ?: 'No indicado') . "\n";
$bodyPlain .= "Fecha aproximada: " . ($fecha ?: 'No indicada') . "\n";
$bodyPlain .= "Número de personas: " . ($personas ?: 'No indicado') . "\n\n";
$bodyPlain .= "Mensaje / Observaciones:\n";
$bodyPlain .= ($mensaje ?: 'Sin observaciones adicionales') . "\n\n";
$bodyPlain .= "-----------------------------------------------------------\n";
$bodyPlain .= "Aviso: Esta solicitud procede del formulario web de Covent Garden.\n";
$bodyPlain .= "No supone confirmación automática. Responder directamente al cliente.\n";

$headers = [];
$headers[] = 'From: ' . ($config['smtp']['from_name'] ?? 'Covent Garden') . ' <' . ($config['smtp']['from_email'] ?? $recipient) . '>';
$headers[] = 'Reply-To: ' . $nombre . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'Content-Type: text/plain; charset=utf-8';

$sent = @mail($recipient, $asunto, $bodyPlain, implode("\r\n", $headers));

if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Tu solicitud se ha enviado con éxito. Josu revisará la información y te responderá personalmente.'
    ], JSON_UNESCAPED_UNICODE);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'No se pudo enviar el correo en este momento. Por favor, contáctanos directamente o inténtalo más tarde.'
    ], JSON_UNESCAPED_UNICODE);
}
