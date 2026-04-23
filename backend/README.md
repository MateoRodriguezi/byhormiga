# ByHormiga Backend API

Django REST API backend para la plataforma de eventos ByHormiga.

## Stack Tecnológico

- Django 4.2 LTS
- Django REST Framework
- PostgreSQL
- Cloudinary (almacenamiento de media)
- django-jazzmin (tema de admin)

## Desarrollo Local

### Requisitos Previos

- Python 3.9+
- PostgreSQL 14+
- Cuenta de Cloudinary

### Setup

1. Clonar el repositorio y navegar al directorio backend:
```bash
cd /Users/mateorodriguez/Desktop/ByHormiga/backend
```

2. Instalar UV:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

3. Sincronizar dependencias:
```bash
uv sync --locked --no-install-project
```

4. Crear archivo .env desde .env.example:
```bash
cp .env.example .env
# Editar .env con tus credenciales
```

5. Ejecutar migraciones:
```bash
uv run --no-sync python manage.py migrate
```

6. Crear superusuario:
```bash
uv run --no-sync python manage.py createsuperuser
```

7. Ejecutar servidor de desarrollo:
```bash
uv run --no-sync python manage.py runserver
```

Panel de admin: http://localhost:8000/admin
API: http://localhost:8000/api/

## Endpoints de API

### Eventos
- `GET /api/events/` - Lista todos los eventos publicados
- `GET /api/events/{slug}/` - Detalle de evento
- `GET /api/events/featured/` - Solo eventos destacados

### Galería
- `GET /api/gallery/` - Lista todos los álbumes publicados
- `GET /api/gallery/{id}/` - Detalle de álbum con fotos

### Blog/Prensa
- `GET /api/posts/` - Lista todos los artículos publicados
- `GET /api/posts/{slug}/` - Detalle de artículo

### Contacto
- `POST /api/contact/` - Enviar mensaje de contacto

## Deployment a Railway

1. Instalar Railway CLI:
```bash
npm install -g railway
```

2. Login:
```bash
railway login
```

3. Inicializar proyecto:
```bash
railway init
```

4. Agregar PostgreSQL:
```bash
railway add --plugin postgresql
```

5. Configurar variables de entorno en el dashboard de Railway:
   - SECRET_KEY
   - DEBUG=False
   - ALLOWED_HOSTS
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
   - CORS_ALLOWED_ORIGINS

6. Deploy:
```bash
git push
```

## Panel de Admin

Acceder en `/admin` con credenciales de superusuario.

### Características:
- Tema oscuro (Jazzmin)
- Administración de eventos con thumbnails de posters
- Badges de estado con colores
- Gestión de álbumes de galería con inline drag-and-drop de fotos
- Editor de artículos de blog
- Mensajes de contacto (solo lectura, marcar como leído)

## Estructura del Proyecto

```
backend/
├── byhormiga/          # Configuración del proyecto
├── events/             # App de eventos y venues
├── gallery/            # App de galería (álbumes y fotos)
├── blog/               # App de artículos de prensa
├── contact/            # App de mensajes de contacto
├── manage.py
├── pyproject.toml
├── uv.lock
├── .env.example
├── .gitignore
├── Procfile
└── README.md
```

## Modelos

### Events App
- **Venue**: Lugares de eventos
- **Event**: Eventos con relación a Venue

### Gallery App
- **Album**: Álbumes de fotos (OneToOne con Event)
- **Photo**: Fotos individuales de un álbum

### Blog App
- **Post**: Artículos de prensa/blog

### Contact App
- **ContactMessage**: Mensajes del formulario de contacto

## Notas

- Las imágenes se almacenan en Cloudinary
- La API usa paginación (20 items por página)
- CORS configurado para permitir origen del frontend
- Admin personalizado con tema oscuro Jazzmin
