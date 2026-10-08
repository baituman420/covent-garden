import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev Middleware para probar los endpoints PHP en local sin necesidad de intérprete PHP
function coventApiDevPlugin() {
  return {
    name: 'covent-api-dev-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const cleanUrl = req.url.split('?')[0];

        if (cleanUrl.endsWith('/api/contact.php') && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            try {
              const data = JSON.parse(body || '{}');
              if (data.website) {
                // Honeypot detectado
                res.end(JSON.stringify({ success: true, message: 'Solicitud recibida.' }));
                return;
              }
              if (!data.nombre || !data.email) {
                res.statusCode = 400;
                res.end(
                  JSON.stringify({
                    success: false,
                    error: 'Nombre y correo electrónico son obligatorios.',
                  })
                );
                return;
              }
              res.end(
                JSON.stringify({
                  success: true,
                  dev_mode: true,
                  message:
                    'Tu solicitud se ha recibido con éxito en modo desarrollo. Josu responderá personalmente.',
                })
              );
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ success: false, error: 'Petición con formato inválido.' }));
            }
          });
          return;
        }

        if (cleanUrl.endsWith('/api/instagram.php') && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(
            JSON.stringify({
              success: true,
              source: 'dev_mock',
              account: '@coventgarden_bilbao',
              profile_url: 'https://instagram.com/coventgarden_bilbao',
              status_note: 'Modo desarrollo: datos simulados de Instagram.',
              post: {
                id: 'dev_latest_post',
                caption:
                  '¡Hoy juega el Athletic! Ambiente inmejorable en Covent Garden Bilbao. Pintas frías, pintxos recién salidos y sentimiento zurigorri en plena calle Doctor Areilza. ¡Aúpa Athletic!',
                media_url: 'images/covent-barra-pintxos.jpg',
                permalink: 'https://www.instagram.com/p/DTTF9mwiDq6/',
                timestamp: '2026-10-04T18:30:00Z',
                media_type: 'IMAGE',
              },
            })
          );
          return;
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), coventApiDevPlugin()],
  base: process.env.VITE_BASE || '/covent-garden/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        grupos: resolve(__dirname, 'grupos-reservados/index.html'),
      },
    },
  },
});
