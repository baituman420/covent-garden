# Guía de Despliegue en DonDominio · Fase 1: Subdominio Beta Privado

Esta guía documenta el procedimiento para desplegar la versión de pruebas en **`https://beta.coventgardenbilbao.es`** (DonDominio Básico, Apache 2.4, PHP 8.x, 5 GB, FTP).

**Objetivo de la Beta**: Permitir que Josu sustituya las fotografías antiguas y agregue las nuevas directamente desde el móvil o el ordenador, manteniendo la web protegida por contraseña y oculta a los motores de búsqueda antes del lanzamiento definitivo en `coventgardenbilbao.es`.

---

## 1. Configuración del Subdominio en DonDominio

1. Accede al panel de control de **DonDominio**.
2. Dirígete a **Gestión de Dominios** y selecciona **`coventgardenbilbao.es`**.
3. En el menú de alojamiento, entra en **Subdominios** y pulsa en **Crear Subdominio**:
   - **Nombre del subdominio**: `beta` (quedará como `beta.coventgardenbilbao.es`).
   - **Directorio de destino**: Selecciona o indica la carpeta correspondiente (habitualmente `/public_html/beta/` o `/subdomains/beta/`).
4. **Certificado SSL**:
   - En la sección **Seguridad / Certificados SSL**, activa el certificado gratuito (Let's Encrypt / DonDominio SSL) para el subdominio `beta.coventgardenbilbao.es`.

---

## 2. Protección de la Beta y Exclusión de Motores de Búsqueda

### A. Exclusión de Indexación (Ya incluida en el paquete)
El paquete compilado ya incluye:
1. **`robots.txt`** bloqueando a todos los rastreadores:
   ```txt
   User-agent: *
   Disallow: /
   ```
2. **Cabecera HTTP `X-Robots-Tag`** forzada en `.htaccess`:
   ```apache
   Header set X-Robots-Tag "noindex, nofollow, noarchive, nosnippet"
   ```
*Ningún buscador (Google, Bing, etc.) indexará el subdominio ni sus contenidos.*

### B. Protección de Acceso Mediante Contraseña (2 Opciones)

#### Opción 1: Desde el panel de DonDominio (Recomendada con 1 Clic)
1. En el panel de DonDominio, ve a **Alojamiento Web** $\rightarrow$ **Directorios Protegidos** (o *Protección con contraseña*).
2. Selecciona la carpeta de destino del subdominio (`/public_html/beta/`).
3. Añade un usuario y contraseña para el acceso al entorno de pruebas:
   - **Usuario**: `covent` (o el que prefiráis)
   - **Contraseña**: La clave provisional privada que acordéis con Josu.
4. Guarda los cambios. A partir de ese momento, cualquier persona que entre a `https://beta.coventgardenbilbao.es` deberá introducir estas credenciales en la ventana emergente del navegador para poder ver la web.

#### Opción 2: Mediante archivo `.htpasswd` directo
Si prefieres gestionarlo por FTP:
1. Descomenta el bloque de autenticación en la raíz `.htaccess`:
   ```apache
   AuthType Basic
   AuthName "Covent Garden Bilbao · Entorno Privado Beta"
   AuthUserFile /ruta/absoluta/hacia/tu/alojamiento/.htpasswd
   Require valid-user
   ```
2. Sube un archivo `.htpasswd` generado con hash Bcrypt.

---

## 3. Subida del Paquete al Subdominio

Dispones del paquete listo para subida en la raíz del proyecto local:
- **Archivo comprimido**: `coventgardenbilbao-dist.zip` (51 MB)
- **Carpeta descomprimida**: `dist/`

### Procedimiento de Subida
1. Conéctate por FTP (FileZilla) o entra en el **Administrador de Archivos Web** de DonDominio.
2. Sitúate en la carpeta del subdominio (ejemplo: `/public_html/beta/`).
3. Sube `coventgardenbilbao-dist.zip` y utiliza la opción **Descomprimir / Extraer aquí** (o sube directamente el contenido de `dist/`).
4. Asegúrate de que los archivos ocultos (`.htaccess`, `robots.txt`, `.backups/.htaccess`) se hayan transferido correctamente.

---

## 4. Configuración de Permisos (CHMOD)

Verifica que las carpetas de trabajo cuenten con permisos de escritura para el intérprete PHP:

| Ruta | Permiso recomendado | Finalidad |
| :--- | :---: | :--- |
| `fotos/` | **`755`** | Permite crear `config.local.php` en el primer acceso |
| `data/` | **`755`** | Permite actualizar `media.json` y guardar `.rate_limit.json` |
| `data/media.json` | **`664`** o `644` | Permite guardar el estado de las fotos |
| `images/` | **`755`** | Almacenamiento de fotos sustituidas |
| `images/.backups/` | **`755`** | Almacenamiento seguro de copias de seguridad |
| `images/uploads/` | **`755`** | Almacenamiento de fotos nuevas añadidas |

---

## 5. Inicialización Segura del Gestor de Fotos para Josu

1. Abre el navegador y entra a:
   ```
   https://beta.coventgardenbilbao.es/fotos
   ```
2. Introduce primero el usuario y contraseña del subdominio (HTTP Basic Auth).
3. A continuación, el panel mostrará el **Asistente de Configuración Inicial**:
   - Josu introduce la contraseña personal que usará para gestionar las fotos (mínimo 6 caracteres).
   - Confirma la contraseña y pulsa **`[Establecer Contraseña e Iniciar]`**.
4. El sistema crea automáticamente `fotos/config.local.php` (chmod `0640`) con hash Bcrypt e inicia sesión.
5. La pantalla de configuración queda **sellada de por vida** y ya solo se solicitará el login estándar.

---

## 6. Procedimiento de Migración al Dominio Definitivo

Una vez que Josu haya sustituido las fotografías, añadido las nuevas y la dirección de Covent Garden valide el resultado visual:

### ¿Qué se debe transferir?
Todo el trabajo fotográfico de Josu reside exclusivamente en dos ubicaciones:
1. **`data/media.json`**: El archivo que contiene la lista de imágenes activas, las nuevas fotos añadidas a galerías y el timestamp de versión.
2. **`images/`**: La carpeta con todas las imágenes optimizadas (incluyendo las nuevas en `images/uploads/` y las copias de seguridad en `images/.backups/`).
3. **`fotos/config.local.php`**: Para conservar la misma contraseña que Josu ya configuró.

### Pasos para el Pase a Producción (`coventgardenbilbao.es`):
1. **Copiar la web a la raíz definitiva**:
   - En el Administrador de Archivos de DonDominio, copia todo el contenido del subdominio beta a la carpeta raíz principal (`/public_html/`).
2. **Eliminar la protección por contraseña perimetral**:
   - En el panel de DonDominio, desactiva la "Protección con contraseña" para el dominio principal (o asegúrate de que `.htaccess` no tenga activo `AuthType Basic`).
3. **Habilitar la indexación en motores de búsqueda**:
   - En la raíz `public_html/.htaccess`, retira la cabecera `Header set X-Robots-Tag "noindex..."`.
   - Modifica `robots.txt` para permitir el rastreo público:
     ```txt
     User-agent: *
     Allow: /
     Disallow: /fotos/
     Disallow: /data/
     ```
4. **Verificación Inmediata**:
   - Entra a `https://coventgardenbilbao.es`: La web mostrará exactamente las fotografías aprobadas en la beta sin necesidad de recompilación ni riesgo de pérdida de datos.
