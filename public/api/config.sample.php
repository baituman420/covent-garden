<?php
/**
 * Covent Garden Bilbao - Configuración del Servidor PHP V2
 * 
 * INSTRUCCIONES DE CONFIGURACIÓN:
 * 1. Duplica este archivo como 'config.php' en el mismo directorio: cp config.sample.php config.php
 * 2. Introduce las credenciales SMTP confirmadas por Josu.
 * 3. Introduce las credenciales de Meta / Instagram cuando estén disponibles.
 * 4. NUNCA subas 'config.php' con credenciales reales al repositorio público.
 */

return [
    // Modo de desarrollo: si es true, no envía correos reales y simula respuestas correctas/error
    'dev_mode' => false,

    // Destinatario principal de las solicitudes de grupos y reservados
    'contact' => [
        'recipient_email' => 'info@coventgardenbilbao.eus', // Pendiente de confirmación con Josu
        'recipient_name'  => 'Josu - Covent Garden Bilbao',
        'subject_prefix'  => '[Covent Garden Web - Solicitud de Grupo] ',
    ],

    // Configuración SMTP para PHPMailer
    'smtp' => [
        'enabled'    => true,
        'host'       => 'smtp.tudominio.com',
        'port'       => 587,
        'encryption' => 'tls', // 'tls' o 'ssl' (465)
        'username'   => 'notificaciones@tudominio.com',
        'password'   => 'TU_CONTRASEÑA_SMTP_AQUI',
        'from_email' => 'notificaciones@tudominio.com',
        'from_name'  => 'Web Covent Garden Bilbao',
    ],

    // Seguridad y Antispam
    'security' => [
        'honeypot_field'      => 'website',
        'rate_limit_seconds'  => 600, // 10 minutos
        'max_requests_per_ip' => 5,
        'allowed_origins'     => [
            'https://baituman420.github.io',
            'https://coventgardenbilbao.eus',
            'http://localhost:5173',
            'http://localhost:3000',
        ],
    ],

    // Conexión oficial Instagram Graph API
    'instagram' => [
        'enabled'         => false, // Activar cuando Josu confirme credenciales de Meta
        'access_token'    => '',
        'user_id'         => '', // Instagram Business Account ID
        'cache_file'      => __DIR__ . '/cache/instagram.json',
        'cache_lifetime'  => 7200, // 2 horas (en segundos)
        'fallback_handle' => '@coventgarden_bilbao',
        'fallback_url'    => 'https://instagram.com/coventgarden_bilbao',
    ],
];
