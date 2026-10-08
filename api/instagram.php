<?php
/**
 * Covent Garden Bilbao - Endpoint de Preintegración con Instagram
 * Consulta la API oficial de Meta / Instagram con caché en servidor y fallback resiliente.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: public, max-age=1800'); // Cache en navegador 30m

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
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$cacheDir = __DIR__ . '/cache';
if (!is_dir($cacheDir)) {
    @mkdir($cacheDir, 0755, true);
}
$cacheFile = $cacheDir . '/instagram.json';
$cacheLifetime = $config['instagram']['cache_lifetime'] ?? 7200; // 2 horas por defecto

// 1. Comprobar caché local
if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < $cacheLifetime) {
    $cached = @file_get_contents($cacheFile);
    if (!empty($cached)) {
        echo $cached;
        exit;
    }
}

// 2. Fallback por defecto si no hay credenciales o falla la conexión
$fallbackResponse = [
    'success' => true,
    'source' => 'fallback',
    'account' => $config['instagram']['fallback_handle'] ?? '@coventgarden_bilbao',
    'profile_url' => $config['instagram']['fallback_url'] ?? 'https://instagram.com/coventgarden_bilbao',
    'status_note' => 'Preintegración preparada. Pendiente de verificación de credenciales de Meta.',
    'post' => [
        'id' => 'covent_latest_fallback',
        'caption' => '¡Hoy juega el Athletic! Ambiente inmejorable en Covent Garden Bilbao. Pintas frías, pintxos recién salidos y sentimiento zurigorri en plena calle Doctor Areilza. ¡Aúpa Athletic!',
        'media_url' => 'images/covent-barra-pintxos.jpg',
        'permalink' => 'https://www.instagram.com/p/DTTF9mwiDq6/',
        'timestamp' => '2026-10-04T18:30:00Z',
        'media_type' => 'IMAGE',
    ],
];

// 3. Consulta a la API oficial de Meta si está configurada
$igConfig = $config['instagram'] ?? [];
if (!empty($igConfig['enabled']) && !empty($igConfig['access_token']) && !empty($igConfig['user_id'])) {
    $apiUrl = sprintf(
        'https://graph.facebook.com/v19.0/%s/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=1&access_token=%s',
        urlencode($igConfig['user_id']),
        urlencode($igConfig['access_token'])
    );

    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 6);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'CoventGardenBilbao/2.0');
    $apiResult = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200 && !empty($apiResult)) {
        $decoded = json_decode($apiResult, true);
        if (!empty($decoded['data'][0])) {
            $latest = $decoded['data'][0];
            $response = [
                'success' => true,
                'source' => 'meta_api',
                'account' => $igConfig['fallback_handle'] ?? '@coventgarden_bilbao',
                'profile_url' => $igConfig['fallback_url'] ?? 'https://instagram.com/coventgarden_bilbao',
                'post' => [
                    'id' => $latest['id'] ?? '',
                    'caption' => $latest['caption'] ?? '',
                    'media_url' => $latest['media_url'] ?? ($latest['thumbnail_url'] ?? ''),
                    'permalink' => $latest['permalink'] ?? $igConfig['fallback_url'],
                    'timestamp' => $latest['timestamp'] ?? '',
                    'media_type' => $latest['media_type'] ?? 'IMAGE',
                ],
            ];
            $jsonResponse = json_encode($response, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            @file_put_contents($cacheFile, $jsonResponse);
            echo $jsonResponse;
            exit;
        }
    }
}

// Retornar fallback y guardar en caché temporal corta (10 minutos) para evitar llamadas fallidas continuas
$jsonFallback = json_encode($fallbackResponse, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
@file_put_contents($cacheFile, $jsonFallback);
echo $jsonFallback;
