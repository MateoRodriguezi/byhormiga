# 🐜 ByHormiga

Sitio web oficial de **ByHormiga**, productora de eventos de Montevideo, Uruguay con más de 30 años de experiencia en la industria del entretenimiento.

---

## 🌐 URLs en Producción

| Servicio | URL |
|----------|-----|
| **Sitio Web** | https://byhormiga.vercel.app |
| **Admin Django** | https://byhormiga-production.up.railway.app/admin |
| **API REST** | https://byhormiga-production.up.railway.app/api |

---

## 🏗️ Arquitectura

```
byhormiga/
├── b_xtFvsBvx7dg-1774568830165/   ← Frontend (Next.js 16)
├── backend/                        ← Backend (Django 4.2)
├── docker-compose.yml              ← Orquestación de servicios
├── Makefile                        ← Comandos útiles
├── skills.md                       ← Documentación técnica
└── agents.md                       ← Guía para agentes IA
```

### Stack Tecnológico

| Capa | Tecnología | Hosting |
|------|-----------|---------|
| **Frontend** | Next.js 16 + TypeScript + Tailwind + Framer Motion | Vercel |
| **Backend / Admin** | Django 4.2 + Django REST Framework + Unfold | Railway |
| **Base de datos** | PostgreSQL | Railway |
| **Media (fotos)** | Cloudinary | Cloudinary CDN |
| **Contenedores** | Docker + Docker Compose (backend + db) | - |
| **Package Manager** | UV (backend) + pnpm (frontend) | - |
| **Repositorio** | GitHub | [github.com/MateoRodriguezi/byhormiga](https://github.com/MateoRodriguezi/byhormiga) |

---

## 🚀 Quick Start (Docker para backend + pnpm para frontend)

**Prerequisitos**: Docker, Docker Compose y pnpm instalados

```bash
# 1. Clonar repositorio
git clone https://github.com/MateoRodriguezi/byhormiga.git
cd byhormiga

# 2. Copiar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Cloudinary

# 3. Levantar backend + base de datos
make fresh

# 4. Levantar frontend local
make frontend-install
make frontend-dev

# 5. Acceder a las URLs
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000/api
# Admin: http://localhost:8000/admin
```

### Comandos Útiles

```bash
make help              # Ver todos los comandos disponibles
make dev               # Levantar backend/db con Docker
make frontend-dev      # Levantar frontend local con pnpm
make logs              # Ver logs de todos los servicios
make migrate           # Ejecutar migraciones
make createsuperuser   # Crear usuario admin
make shell             # Abrir Django shell
make down              # Detener servicios
```

Ver `skills.md` para documentación completa de comandos.

---

## 🖥️ Frontend

Generado con **v0.dev** y ajustado manualmente. Estética dark/underground, blanco y negro, tipografía bold uppercase.

### Páginas

- `/` — Home con hero, stats, eventos, galería, prensa
- `/eventos` — Listado de todos los eventos
- `/eventos/[slug]` — Detalle de cada evento
- `/galeria` — Galería de fotos por evento
- `/prensa` — Artículos y prensa
- `/prensa/[slug]` — Detalle de artículo
- `/contacto` — Formulario de contacto

### Setup Local (Sin Docker)

```bash
cd b_xtFvsBvx7dg-1774568830165

# Instalar pnpm (si no lo tienes)
npm install -g pnpm

# Instalar dependencias
pnpm install

# Correr servidor de desarrollo
pnpm dev
# → http://localhost:3000
```

### Variables de Entorno

Crear `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://byhormiga-production.up.railway.app/api
```

Para desarrollo local contra backend local:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## ⚙️ Backend

Django con panel de administración **Unfold** (dark mode) para que el propietario gestione el contenido sin tocar código.

### Apps Django

- `events` — Eventos y Venues
- `gallery` — Álbumes y Fotos
- `blog` — Artículos de prensa
- `contact` — Mensajes de contacto
- `partners` — Marcas colaboradoras

### API Endpoints

| Method | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/events/` | Lista de eventos publicados |
| `GET` | `/api/events/{slug}/` | Detalle de evento |
| `GET` | `/api/events/featured/` | Eventos destacados |
| `GET` | `/api/gallery/` | Álbumes con fotos |
| `GET` | `/api/posts/` | Artículos de prensa |
| `GET` | `/api/posts/{slug}/` | Detalle de artículo |
| `POST` | `/api/contact/` | Enviar mensaje de contacto |

### Setup Local (Opción 1: Con UV - Recomendado)

**UV** es un gestor de paquetes Python ultra-rápido.

```bash
cd backend

# Instalar UV (si no lo tienes)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Sincronizar dependencias desde pyproject.toml + uv.lock
uv sync --locked --no-install-project

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Migraciones
uv run --no-sync python manage.py migrate

# Crear superusuario para el admin
uv run --no-sync python manage.py createsuperuser

# Correr servidor
uv run --no-sync python manage.py runserver
# → Admin en http://localhost:8000/admin
# → API en http://localhost:8000/api
```

### Variables de Entorno

Crear `backend/.env`:

```env
SECRET_KEY=tu-secret-key-aqui
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Base de datos (SQLite para desarrollo local)
# DATABASE_URL=postgresql://user:password@localhost:5432/byhormiga

# Cloudinary
CLOUDINARY_CLOUD_NAME=dlmzz0sxg
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

---

## 🚀 Deployment

### Frontend → Vercel

- Conectado al repo GitHub (`main` branch)
- **Root Directory**: `b_xtFvsBvx7dg-1774568830165`
- Deploy automático en cada push a `main`
- **Variable de entorno**: `NEXT_PUBLIC_API_URL`

### Backend → Railway

- Conectado al repo GitHub (`main` branch)
- **Root Directory**: `backend`
- **Pre-deploy Command**: `uv run --no-sync python manage.py collectstatic --no-input && uv run --no-sync python manage.py migrate --no-input`
- **Start Command**: `gunicorn byhormiga.wsgi --log-file -`
- **Servicios**: byhormiga (Django) + Postgres

#### Variables de Entorno en Railway

```env
SECRET_KEY=...
DEBUG=False
ALLOWED_HOSTS=.railway.app
DATABASE_URL=...          # ← referenciada desde el servicio Postgres
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CORS_ALLOWED_ORIGINS=https://byhormiga.vercel.app
```

---

## 📋 Panel de Administración

El propietario accede a https://byhormiga-production.up.railway.app/admin y puede:

- ✅ Crear y editar eventos (título, fecha, venue, flyer, precio, link de tickets)
- ✅ Subir fotos a la galería por evento
- ✅ Publicar artículos de prensa
- ✅ Ver mensajes de contacto
- ✅ Marcar eventos como destacados (aparecen en el home)
- ✅ Cambiar estado de eventos (Borrador / Publicado / Agotado / Cancelado)

---

## 📦 Dependencias Principales

### Frontend

```json
{
  "next": "^14",
  "react": "^19",
  "typescript": "^5",
  "tailwindcss": "^3",
  "framer-motion": "^11",
  "lucide-react": "^0.383"
}
```

### Backend

```txt
django==4.2
djangorestframework==3.15
django-unfold
django-cors-headers
cloudinary
django-cloudinary-storage
psycopg[binary]
dj-database-url
gunicorn
whitenoise
```

---

## 📚 Documentación

- **`README.md`** - Este archivo, overview del proyecto
- **`skills.md`** - Documentación técnica completa, comandos, stack
- **`agents.md`** - Guía para agentes de IA que trabajan en el proyecto
- **`Makefile`** - Comandos útiles para Docker (backend/db) y frontend con pnpm

---

## 🔜 Pendientes

- [ ] Conectar frontend con API real (descomentar fetch calls en `lib/api.ts`)
- [ ] Conectar dominio `byhormiga.com.uy` (agregar registro A `216.198.79.1` en DNS)
- [ ] Rotar credenciales de PostgreSQL en Railway
- [ ] Cargar eventos reales desde el admin
- [ ] Subir fotos reales a la galería
- [x] Migrar a UV para gestión de paquetes Python
- [x] Implementar Docker + Docker Compose para backend y base de datos
- [x] Crear documentación para agentes IA

---

## 👥 Equipo

- **Mateo Rodriguez**
- **Panita Isaac**

---

## 📄 Licencia

Todos los derechos reservados © ByHormiga 2026

---

<p align="center">
  <sub>Construido con Next.js + Django · Deployado en Vercel + Railway</sub>
</p>
