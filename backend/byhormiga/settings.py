"""
Django settings for byhormiga project.
"""

from pathlib import Path
from decouple import config, Csv
import cloudinary
import cloudinary.uploader
import cloudinary.api

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config(
    "SECRET_KEY", default="django-insecure-please-change-this-in-production"
)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config("DEBUG", default=True, cast=bool)

ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="localhost,127.0.0.1", cast=Csv())

# CSRF Configuration for Railway
CSRF_TRUSTED_ORIGINS = [
    "https://byhormiga-production.up.railway.app",
    "https://*.railway.app",
]

# Application definition

INSTALLED_APPS = [
    # Django Unfold Admin Theme (must be before django.contrib.admin)
    "unfold",
    "unfold.contrib.filters",
    "unfold.contrib.forms",
    # Django Apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "whitenoise.runserver_nostatic",
    "django.contrib.staticfiles",
    # Third Party
    "rest_framework",
    "corsheaders",
    "django_filters",
    "drf_spectacular",
    "django_extensions",
    "cloudinary",
    "cloudinary_storage",
    "adminsortable2",
    # Local Apps
    "events",
    "blog",
    "contact",
    "partners",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "byhormiga.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "byhormiga.wsgi.application"

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

import dj_database_url

DATABASES = {
    "default": dj_database_url.config(
        default=config("DATABASE_URL", default="sqlite:///db.sqlite3"), conn_max_age=600
    )
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
LANGUAGE_CODE = "es-uy"
TIME_ZONE = "America/Montevideo"
USE_I18N = True
USE_TZ = True

# CORS Settings
CORS_ALLOWED_ORIGINS = config(
    "CORS_ALLOWED_ORIGINS", default="http://localhost:3000", cast=Csv()
)
CORS_ALLOW_CREDENTIALS = True

# REST Framework
REST_FRAMEWORK = {
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.OrderingFilter",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 20,
}

SPECTACULAR_SETTINGS = {
    "TITLE": "ByHormiga API",
    "DESCRIPTION": "Documentacion de la API de ByHormiga",
    "VERSION": "1.0.0",
}

# Cloudinary Configuration
cloudinary.config(
    cloud_name=config("CLOUDINARY_CLOUD_NAME", default=""),
    api_key=config("CLOUDINARY_API_KEY", default=""),
    api_secret=config("CLOUDINARY_API_SECRET", default=""),
    secure=True,
)

# Storage backends
if config("CLOUDINARY_CLOUD_NAME", default=""):
    DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"

# Static files (CSS, JavaScript, Images)
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

# WhiteNoise configuration
WHITENOISE_USE_FINDERS = True
WHITENOISE_AUTOREFRESH = True if DEBUG else False
WHITENOISE_KEEP_ONLY_HASHED_FILES = False

# Media files
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Django Unfold Admin Theme Configuration
UNFOLD = {
    "SITE_TITLE": "ByHormiga Admin",
    "SITE_HEADER": "ByHormiga",
    "SITE_URL": "/",
    "SITE_SYMBOL": "celebration",  # Google Material Symbol
    "COLORS": {
        "primary": {
            "50": "250 250 250",  # Casi blanco
            "100": "245 245 245",  # Gris muy claro
            "200": "229 229 229",  # Gris claro
            "300": "212 212 212",  # Gris medio-claro
            "400": "163 163 163",  # Gris medio
            "500": "115 115 115",  # Gris
            "600": "82 82 82",  # Gris medio-oscuro
            "700": "64 64 64",  # Gris oscuro
            "800": "38 38 38",  # Gris muy oscuro
            "900": "23 23 23",  # Casi negro
            "950": "10 10 10",  # Negro
        },
    },
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": True,
        "navigation": [
            {
                "title": "Eventos",
                "separator": True,
                "items": [
                    {
                        "title": "Eventos",
                        "icon": "calendar_month",
                        "link": lambda request: "/admin/events/event/",
                    },
                    {
                        "title": "Venues",
                        "icon": "location_on",
                        "link": lambda request: "/admin/events/venue/",
                    },
                ],
            },
            {
                "title": "Contenido",
                "separator": True,
                "items": [
                    {
                        "title": "Artículos",
                        "icon": "article",
                        "link": lambda request: "/admin/blog/post/",
                    },
                    {
                        "title": "Mensajes",
                        "icon": "mail",
                        "link": lambda request: "/admin/contact/contactmessage/",
                    },
                ],
            },
            {
                "title": "Partners",
                "separator": True,
                "items": [
                    {
                        "title": "Marcas",
                        "icon": "handshake",
                        "link": lambda request: "/admin/partners/partner/",
                    },
                ],
            },
        ],
    },
}
