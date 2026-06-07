# NovaStellar Scientific E.I.R.L.

Sitio corporativo estático para NovaStellar Scientific E.I.R.L., preparado para usar como web oficial de empresa, perfil de desarrollador y verificación de Google Play Console.

## Archivos

- `index.html`: estructura principal, SEO básico, Open Graph básico y metaetiqueta de Google Search Console.
- `styles.css`: diseño responsive con fondo oscuro, glassmorphism, animaciones suaves y estilos móviles.
- `script.js`: menú móvil, scroll suave, animaciones, estado activo de navegación, fallback de iconos y formulario visual.
- `README.md`: instrucciones del proyecto y despliegue.

## Verificación de Google Search Console

La metaetiqueta solicitada ya está incluida en el `<head>` de `index.html`:

```html
<meta name="google-site-verification" content="YbcT4YpL01SoiIJnn_XRIWDLZ_HEXor4SYHHNOS7NzY" />
```

## Cómo ver el sitio localmente

Abre `index.html` directamente en el navegador o usa un servidor estático simple.

Ejemplo con Python:

```bash
python3 -m http.server 8080
```

Luego entra a:

```text
http://localhost:8080
```

## Desplegar en GitHub Pages

1. Crea un repositorio en GitHub, por ejemplo `novastellar-scientific`.
2. Sube estos archivos a la raíz del repositorio:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
3. En GitHub, entra a `Settings`.
4. Abre la sección `Pages`.
5. En `Build and deployment`, selecciona `Deploy from a branch`.
6. Elige la rama `main` y la carpeta `/(root)`.
7. Guarda los cambios y espera a que GitHub genere la URL pública.
8. Usa esa URL como sitio web oficial en Google Play Console y para verificar la propiedad en Google Search Console.

## Desplegar en Cloudflare Pages

1. Entra a Cloudflare Pages.
2. Conecta el repositorio de GitHub.
3. En configuración de build, deja el comando de build vacío.
4. En directorio de salida, usa `/`.
5. Publica el proyecto.

## Notas técnicas

- No usa frameworks ni dependencias externas.
- Los iconos de apps se cargan desde las fichas oficiales de Google Play cuando están disponibles.
- Si un icono remoto falla, el sitio muestra un placeholder profesional generado por CSS.
- El formulario de contacto es visual y estático; el contacto real se realiza por correo.
- Antes de publicar en dominio propio, puedes añadir una URL canónica y una imagen Open Graph propia si ya tienes dominio e imagen corporativa final.
