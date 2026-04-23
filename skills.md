# 🛠️ Skills - ByHormiga Project

Este archivo documenta las habilidades, comandos y capacidades del proyecto ByHormiga para facilitar el trabajo con agentes de IA y desarrolladores.

---

## 📚 Stack Tecnológico

### Frontend
- **Framework**: Next.js 16.2 (App Router)
- **React**: 19.2.4
- **Lenguaje**: TypeScript 5.7.3
- **Estilos**: Tailwind CSS 4.2
- **UI Components**: Radix UI + shadcn/ui
- **Animaciones**: Framer Motion 11.15
- **Gestión de paquetes**: pnpm

### Backend
- **Framework**: Django 4.2.16
- **API**: Django REST Framework 3.15.2
- **Admin**: Django Unfold 0.38.0
- **Base de datos**: PostgreSQL 16 (producción) / SQLite (dev)
- **ORM**: Django ORM
- **Almacenamiento**: Cloudinary (imágenes)
- **Servidor**: Gunicorn 23.0.0
- **Gestión de paquetes**: UV

### Infraestructura
- **Contenedores**: Docker + Docker Compose (backend + db)
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Railway
- **Base de datos**: Railway PostgreSQL
- **CDN**: Cloudinary

---

## 🐳 Comandos Docker (Backend + DB)

### Setup Inicial
```bash
# Levantar backend + db (primera vez)
make fresh

# O manualmente:
docker compose build
docker compose up -d
docker compose exec backend uv run --no-sync python manage.py migrate
docker compose exec backend uv run --no-sync python manage.py createsuperuser
```

### Uso Diario
```bash
make dev              # Levantar servicios y ver logs
make up               # Levantar servicios en background
make down             # Detener servicios
make restart          # Reiniciar servicios
make logs             # Ver logs de todos los servicios
make logs-backend     # Ver solo logs del backend
```

### Base de Datos
```bash
make migrate          # Ejecutar migraciones
make makemigrations   # Crear nuevas migraciones
make db-shell         # Abrir shell de PostgreSQL
make db-backup        # Hacer backup de la BD
make createsuperuser  # Crear usuario admin
```

### Backend
```bash
make shell            # Django shell
make backend-shell    # Shell bash en el contenedor
make collectstatic    # Recolectar archivos estáticos
make test             # Ejecutar tests
```

### Frontend (local con pnpm)
```bash
make frontend-install # Instalar dependencias
make frontend-dev     # Levantar frontend en desarrollo
make frontend-build   # Build de producción
make frontend-lint    # Ejecutar lint
```

---

## 🚀 Comandos UV (Desarrollo local sin Docker)

### Setup
```bash
cd backend

# Instalar UV (si no lo tienes)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Instalar dependencias
uv sync --locked --no-install-project
```

### Gestión de Paquetes
```bash
# Agregar un paquete
make uv-add PKG=nombre_paquete

# O manualmente:
uv add nombre_paquete

# Sincronizar dependencias
make uv-sync

# Actualizar un paquete
uv add --upgrade-package nombre_paquete
```

---

## 📁 Estructura del Proyecto

```
byhormiga/
├── backend/                    # Django Backend
│   ├── byhormiga/             # Configuración principal
│   │   ├── settings.py        # Settings de Django
│   │   ├── urls.py            # URL routing principal
│   │   └── wsgi.py            # WSGI application
│   ├── events/                # App de eventos
│   │   ├── models.py          # Event, Venue
│   │   ├── serializers.py     # EventSerializer, VenueSerializer
│   │   ├── views.py           # ViewSets de API
│   │   └── admin.py           # Admin de Unfold
│   ├── gallery/               # App de galería
│   │   ├── models.py          # Album, Photo
│   │   └── ...
│   ├── blog/                  # App de prensa
│   ├── contact/               # App de contacto
│   ├── partners/              # App de partners
│   ├── Dockerfile             # Multi-stage con UV
│   ├── pyproject.toml         # Config de UV
│   ├── uv.lock                # Lockfile de dependencias
│   └── manage.py              # Django CLI
├── b_xtFvsBvx7dg-1774568830165/  # Next.js Frontend
│   ├── app/                   # App Router
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Layout principal
│   │   ├── eventos/           # Página de eventos
│   │   ├── galeria/           # Página de galería
│   │   ├── prensa/            # Página de prensa
│   │   └── contacto/          # Página de contacto
│   ├── components/            # Componentes React
│   │   ├── sections/          # Secciones de páginas
│   │   ├── ui/                # Componentes UI (shadcn)
│   │   ├── Navbar.tsx         # Navegación
│   │   └── Footer.tsx         # Footer
│   ├── lib/                   # Utilidades
│   │   ├── api.ts             # Funciones de API
│   │   ├── types.ts           # TypeScript types
│   │   └── utils.ts           # Helpers
│   ├── package.json           # Dependencias npm
│   └── next.config.mjs        # Config de Next.js
├── docker-compose.yml         # Orquestación de servicios
├── Makefile                   # Comandos útiles
├── README.md                  # Documentación principal
├── skills.md                  # Este archivo
└── agents.md                  # Guía para agentes IA
```

---

## 🌐 Endpoints de API

### Eventos
- `GET /api/events/` - Lista de eventos
- `GET /api/events/{slug}/` - Detalle de evento
- `GET /api/events/featured/` - Eventos destacados

### Galería
- `GET /api/gallery/` - Álbumes con fotos

### Prensa
- `GET /api/posts/` - Artículos de prensa
- `GET /api/posts/{slug}/` - Detalle de artículo

### Contacto
- `POST /api/contact/` - Enviar mensaje

---

## 🎨 Convenciones de Código

### Django (Backend)
- Modelos en singular: `Event`, `Venue`, `Photo`
- Serializers con sufijo `Serializer`: `EventSerializer`
- ViewSets con sufijo `ViewSet`: `EventViewSet`
- Admin personalizado con Unfold
- Slugs automáticos en models con `save()`
- Propiedades computadas en modelos: `@property`

### Next.js (Frontend)
- Componentes en PascalCase: `EventCard.tsx`
- Hooks en camelCase: `useToast.ts`
- Server Components por defecto
- Client Components marcados con `'use client'`
- Tipos en `lib/types.ts`
- API calls en `lib/api.ts`
- Estilos con Tailwind, sin CSS modules

### Git
- Commits en español
- Formato: `tipo: descripción`
- Tipos: feat, fix, docs, style, refactor, test, chore

---

## 🔐 Variables de Entorno

### Backend (.env)
```env
SECRET_KEY=...
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgresql://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

---

## 🧪 Testing

```bash
# Backend (Django tests)
make test

# O manualmente:
docker compose exec backend uv run --no-sync python manage.py test

# Frontend (no configurado aún)
cd b_xtFvsBvx7dg-1774568830165
pnpm test
```

---

## 🚢 Deployment

### Frontend (Vercel)
- Auto-deploy desde `main` branch
- Root directory: `b_xtFvsBvx7dg-1774568830165`
- Build command: `pnpm build`
- Environment variable: `NEXT_PUBLIC_API_URL`

### Backend (Railway)
- Auto-deploy desde `main` branch
- Root directory: `backend`
- Build command: `uv run --no-sync python manage.py collectstatic --no-input && uv run --no-sync python manage.py migrate --no-input`
- Start command: `uv run --no-sync gunicorn byhormiga.wsgi --log-file -`
- Servicios: Django + PostgreSQL

---

## 📦 Gestión de Dependencias

### Agregar paquete al backend
```bash
# Con UV (recomendado)
make uv-add PKG=nombre_paquete

# Sin Docker
cd backend && uv add nombre_paquete
```

### Agregar paquete al frontend
```bash
cd b_xtFvsBvx7dg-1774568830165
pnpm add nombre_paquete
```

---

## 🐛 Debugging

### Backend
```bash
# Ver logs en tiempo real
make logs-backend

# Shell de Django
make shell

# Shell de base de datos
make db-shell
```

### Frontend
```bash
# Levantar frontend en desarrollo
make frontend-dev

# O manualmente
cd b_xtFvsBvx7dg-1774568830165 && pnpm dev
```

---

## 🔄 Workflows Comunes

### Crear un nuevo modelo en Django
1. Editar `models.py` en la app correspondiente
2. `make makemigrations`
3. `make migrate`
4. Agregar al `admin.py`
5. Crear serializer en `serializers.py`
6. Agregar endpoint en `views.py` y `urls.py`

### Agregar una nueva página en Next.js
1. Crear carpeta en `app/nueva-pagina/`
2. Crear `page.tsx`
3. Opcional: crear `layout.tsx`
4. Agregar link en `Navbar.tsx`

### Actualizar dependencias
```bash
# Backend
cd backend
uv tree
uv add --upgrade-package nombre_paquete

# Frontend
cd b_xtFvsBvx7dg-1774568830165
pnpm outdated
pnpm update nombre_paquete
```

---

## 📞 URLs Útiles

- **Frontend Local**: http://localhost:3000
- **Backend Local**: http://localhost:8000
- **Admin Local**: http://localhost:8000/admin
- **API Local**: http://localhost:8000/api

- **Frontend Producción**: https://byhormiga.vercel.app
- **Backend Producción**: https://byhormiga-production.up.railway.app
- **Admin Producción**: https://byhormiga-production.up.railway.app/admin

---

## 💡 Tips

1. **Usa `make help`** para ver todos los comandos disponibles
2. **UV es mucho más rápido** para instalar paquetes
3. **Docker se usa para backend y base de datos** en desarrollo local
4. **El admin de Unfold** está en modo oscuro para match con la estética del sitio
5. **Cloudinary** maneja todas las imágenes automáticamente
6. **Los serializers** mapean automáticamente los campos del modelo al formato del frontend
