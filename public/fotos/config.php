<?php
// Configuración base del Gestor Mínimo de Fotografías · Covent Garden Bilbao (/fotos)
// Las credenciales privadas se guardan de forma aislada en config.local.php (ignorado por git).

if (!defined('COVENT_FOTOS_APP')) {
    http_response_code(403);
    exit('Acceso directo no permitido.');
}

$baseConfig = [
    // La contraseña se inicializa en config.local.php o mediante la pantalla de configuración inicial
    'admin_password_hash' => null,

    // Nombre y título del panel
    'app_title' => 'Gestor de Fotografías · Covent Garden Bilbao',
    'app_brand' => 'Covent Garden',

    // Límites y seguridad de subida
    'max_upload_bytes' => 15 * 1024 * 1024, // 15 MB
    'allowed_extensions' => ['jpg', 'jpeg', 'png', 'webp'],
    'allowed_mimes' => ['image/jpeg', 'image/png', 'image/webp'],

    // Protección contra fuerza bruta persistente por IP
    'rate_limit_attempts' => 5,
    'rate_limit_lockout' => 900, // 15 minutos en segundos

    // Rutas absolutas en el servidor
    'path_data' => dirname(__DIR__) . '/data/media.json',
    'path_rate_limit' => dirname(__DIR__) . '/data/.rate_limit.json',
    'path_images' => dirname(__DIR__) . '/images',
    'path_backups' => dirname(__DIR__) . '/images/.backups',
    'path_uploads' => dirname(__DIR__) . '/images/uploads',
    'path_local_config' => __DIR__ . '/config.local.php',

    // Dimensiones máximas de optimización (para redimensionado sin deformación)
    'max_dimension_hero' => 1920,
    'max_dimension_gallery' => 1400,
    'max_dimension_carta' => 900,
    'image_quality_jpeg' => 84,
    'image_quality_webp' => 82,
];

// Cargar configuración local privada si existe (aislada del repositorio)
if (file_exists(__DIR__ . '/config.local.php')) {
    $localConfig = require __DIR__ . '/config.local.php';
    if (is_array($localConfig)) {
        $baseConfig = array_merge($baseConfig, $localConfig);
    }
}

return $baseConfig;
