.PHONY: help build up down restart logs logs-backend clean migrate makemigrations createsuperuser shell backend-shell bash collectstatic db-shell db-backup db-restore dev fresh test uv-lock uv-sync uv-add frontend-install frontend-dev frontend-build frontend-lint

FRONTEND_DIR := b_xtFvsBvx7dg-1774568830165

help: ## Mostrar esta ayuda
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Docker commands
build: ## Construir todos los contenedores
	docker compose build

up: ## Levantar todos los servicios
	docker compose up

down: ## Detener todos los servicios
	docker compose down

restart: ## Reiniciar todos los servicios
	docker compose restart

logs: ## Ver logs de todos los servicios
	docker compose logs -f

logs-backend: ## Ver logs del backend
	docker compose logs -f backend

clean: ## Limpiar contenedores, volúmenes e imágenes
	docker compose down -v --rmi all

# Backend commands
migrate: ## Ejecutar migraciones de Django
	docker compose run --rm backend uv run --no-sync manage.py migrate

makemigrations: ## Crear nuevas migraciones
	docker compose run --rm backend uv run --no-sync manage.py makemigrations

createsuperuser: ## Crear superusuario de Django
	docker compose run --rm backend uv run --no-sync manage.py createsuperuser

shell: ## Abrir shell_plus de Django
	docker compose run --rm backend uv run --no-sync manage.py shell_plus

backend-shell: ## Abrir shell bash en el contenedor del backend
	docker compose run --rm backend sh

bash: ## Abrir bash en el contenedor del backend
	docker compose run --rm backend bash

collectstatic: ## Recolectar archivos estáticos
	docker compose run --rm backend uv run --no-sync manage.py collectstatic --no-input

# Frontend commands (local con pnpm)
frontend-install: ## Instalar dependencias del frontend
	pnpm --dir $(FRONTEND_DIR) install

frontend-dev: ## Correr frontend local en modo desarrollo
	pnpm --dir $(FRONTEND_DIR) dev

frontend-build: ## Build del frontend
	pnpm --dir $(FRONTEND_DIR) build

frontend-lint: ## Lint del frontend
	pnpm --dir $(FRONTEND_DIR) lint

# Database commands
db-shell: ## Abrir shell de PostgreSQL
	docker compose run --rm db psql -U byhormiga -d byhormiga

db-backup: ## Hacer backup de la base de datos
	docker compose run --rm db pg_dump -U byhormiga byhormiga > backup_$$(date +%Y%m%d_%H%M%S).sql

db-restore: ## Restaurar base de datos desde backup (usar: make db-restore FILE=backup.sql)
	cat $(FILE) | docker compose run --rm -T db psql -U byhormiga byhormiga

# Development commands
dev: ## Levantar backend/db con Docker (correr frontend con make frontend-dev)
	docker compose up

fresh: down build up migrate ## Setup backend/db desde cero

# Testing
test: ## Ejecutar tests del backend
	docker compose run --rm backend uv run --no-sync manage.py test

# UV commands (local development sin Docker)
uv-lock: ## Generar o actualizar uv.lock
	cd backend && uv lock

uv-sync: ## Sincronizar dependencias desde pyproject/uv.lock
	cd backend && uv sync --locked --no-install-project

uv-add: ## Agregar paquete con UV (usar: make uv-add PKG=nombre_paquete)
	cd backend && uv add $(PKG)
