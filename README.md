🐜 byhormiga — Sitio Web Oficial
Sitio web oficial de byhormiga, productora de eventos de Montevideo, Uruguay con más de 30 años de experiencia en la industria del entretenimiento.

🌐 URLs en producción
ServicioURLSitio webhttps://byhormiga.vercel.appAdmin Djangohttps://byhormiga-production.up.railway.app/adminAPI RESThttps://byhormiga-production.up.railway.app/api

🏗️ Arquitectura
byhormiga/
├── b_xtFvsBvx7dg-1774568830165/   ← Frontend (Next.js 14)
└── backend/                        ← Backend (Django 4.2)
Stack
CapaTecnologíaHostingFrontendNext.js 14 + TypeScript + Tailwind + Framer MotionVercelBackend / AdminDjango 4.2 + Django REST Framework + UnfoldRailwayBase de datosPostgreSQLRailwayMedia (fotos)CloudinaryCloudinary CDNRepositorioGitHubgithub.com/MateoRodriguezi/byhormiga

🖥️ Frontend
Generado con v0.dev y ajustado manualmente. Estética dark/underground, blanco y negro, tipografía bold uppercase.
Páginas

/ — Home con hero, stats, eventos, galería, prensa
/eventos — Listado de todos los eventos
/eventos/[slug] — Detalle de cada evento
/galeria — Galería de fotos por evento
/prensa — Artículos y prensa
/prensa/[slug] — Detalle de artículo
/contacto — Formulario de contacto

Setup local
bashcd b_xtFvsBvx7dg-1774568830165
pnpm install
pnpm dev
# → http://localhost:3000
Variables de entorno
Crear .env.local:
NEXT_PUBLIC_API_URL=https://byhormiga-production.up.railway.app/api
Para desarrollo local contra backend local:
NEXT_PUBLIC_API_URL=http://localhost:8000/api

⚙️ Backend
Django con panel de administración Unfold (dark mode) para que el propietario gestione el contenido sin tocar código.
Apps Django

events — Eventos y Venues
gallery — Álbumes y Fotos
blog — Artículos de prensa
contact — Mensajes de contacto

API Endpoints
GET  /api/events/              → Lista de eventos publicados
GET  /api/events/{slug}/       → Detalle de evento
GET  /api/events/featured/     → Eventos destacados
GET  /api/gallery/             → Álbumes con fotos
GET  /api/posts/               → Artículos de prensa
GET  /api/posts/{slug}/        → Detalle de artículo
POST /api/contact/             → Enviar mensaje de contacto
Setup local
bashcd backend

# Crear entorno virtual
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Migraciones
python manage.py migrate

# Crear superusuario para el admin
python manage.py createsuperuser

# Correr servidor
python manage.py runserver
# → Admin en http://localhost:8000/admin
# → API en http://localhost:8000/api
Variables de entorno (backend/.env)
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

🚀 Deploy
Frontend → Vercel

Conectado al repo GitHub (main branch)
Root Directory: b_xtFvsBvx7dg-1774568830165
Deploy automático en cada push a main
Variable de entorno: NEXT_PUBLIC_API_URL

Backend → Railway

Conectado al repo GitHub (main branch)
Root Directory: backend
Pre-deploy Command: python manage.py collectstatic --no-input && python manage.py migrate --no-input
Start Command: gunicorn byhormiga.wsgi --log-file -
Servicios: byhormiga (Django) + Postgres

Variables de entorno en Railway
SECRET_KEY
DEBUG=False
ALLOWED_HOSTS=.railway.app
DATABASE_URL          ← referenciada desde el servicio Postgres
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
CORS_ALLOWED_ORIGINS=https://byhormiga.vercel.app

📋 Panel de administración
El propietario accede a https://byhormiga-production.up.railway.app/admin y puede:

✅ Crear y editar eventos (título, fecha, venue, flyer, precio, link de tickets)
✅ Subir fotos a la galería por evento
✅ Publicar artículos de prensa
✅ Ver mensajes de contacto
✅ Marcar eventos como destacados (aparecen en el home)
✅ Cambiar estado de eventos (Borrador / Publicado / Agotado / Cancelado)


📦 Dependencias principales
Frontend
json{
  "next": "^14",
  "react": "^19",
  "typescript": "^5",
  "tailwindcss": "^3",
  "framer-motion": "^11",
  "lucide-react": "^0.383"
}
Backend
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

🔜 Pendientes

 Conectar frontend con API real (descomentar fetch calls en lib/api.ts)
 Conectar dominio byhormiga.com.uy (agregar registro A 216.198.79.1 en DNS)
 Rotar credenciales de PostgreSQL en Railway
 Cargar eventos reales desde el admin
 Subir fotos reales a la galería
 Tomar cambios del doc


👥 Equipo
Mateo Rodriguez 
Panita Isaac


Construido con Next.js + Django · Deployado en Vercel + Railway · 2026
