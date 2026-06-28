# HABITADAS — Sitio web psicosocial

Sitio Next.js 16 para HABITADAS: profesionales, agendamiento de citas y panel admin.

## Requisitos

- Node.js 20+
- npm 10+

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Imágenes

Todas las imágenes viven en `public/` y se incluyen en el despliegue:

| Carpeta | Uso |
|---------|-----|
| `public/logo.png` | Logo del sitio |
| `public/hero/` | Portada, servicios, áreas |
| `public/team/` | Fotos de profesionales |
| `public/uploads/` | Imágenes adicionales (opcional) |

Para agregar una imagen:

1. Colócala en la carpeta correspondiente (ej. `public/hero/nueva.jpg`)
2. Referencia la ruta en el código: `"/hero/nueva.jpg"`
3. Verifica que exista: `npm run verify:assets`
4. Haz commit — la imagen viaja con el repo y el Docker

```bash
npm run verify:assets   # falla si falta alguna imagen referenciada
```

## Build de producción

```bash
npm run build
npm start
```

## Docker (local)

```bash
npm run docker:build
npm run docker:up
# → http://localhost:3000
npm run docker:down
```

## Despliegue con GitHub Actions

El repositorio incluye dos workflows:

### `CI` (`.github/workflows/ci.yml`)

Se ejecuta en cada push y PR a `main`:

- Instala dependencias
- Verifica que todas las imágenes referenciadas existan
- Ejecuta lint
- Compila el proyecto

### `Deploy Docker` (`.github/workflows/deploy.yml`)

Se ejecuta al hacer push a `main`:

- Construye la imagen Docker (incluye `public/` con todas las imágenes)
- Publica en **GitHub Container Registry**: `ghcr.io/<usuario>/<repo>:latest`

### Ejecutar en un servidor

```bash
# Login en GHCR (necesitas un PAT con read:packages)
echo $GITHUB_TOKEN | docker login ghcr.io -u TU_USUARIO --password-stdin

# Descargar y ejecutar
docker pull ghcr.io/alejandro-llanganate/all-software-consulting:latest
docker run -d \
  --name habitadas \
  -p 3000:3000 \
  --restart unless-stopped \
  ghcr.io/alejandro-llanganate/all-software-consulting:latest
```

### Hacer pública la imagen en GHCR

1. Ve a **GitHub → Packages → tu imagen**
2. **Package settings → Change visibility → Public**

## Variables de entorno

Copia `.env.example` a `.env.local` para desarrollo:

```bash
cp .env.example .env.local
```

## Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Portada |
| `/profesionales` | Listado de especialistas |
| `/profesionales/[slug]/agendar` | Agendar cita |
| `/admin` | Panel profesional (PIN: `1234`) |

## Stack

Next.js 16 · React 19 · Tailwind 4 · Framer Motion · Swiper
