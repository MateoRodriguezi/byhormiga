.PHONY: help build up down restart logs clean migrate createsuperuser shell test

help: ## Mostrar esta ayuda
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Docker commands
build: ## Construir todos los contenedores
	docker-compose build

up: ## Levantar todos los servicios
	docker-compose up -d

down: ## Detener todos los servicios
	docker-compose down

restart: ## Reiniciar todos los servicios
	docker-compose restart

logs: ## Ver logs de todos los servicios
	docker-compose logs -f

logs-backend: ## Ver logs del backend
	docker-compose logs -f backend

logs-frontend: ## Ver logs del frontend
	docker-compose logs -f frontend

clean: ## Limpiar contenedores, volúmenes e imágenes
	docker-compose down -v --rmi all

# Backend commands
migrate: ## Ejecutar migraciones de Django
	docker-compose exec backend python manage.py migrate

makemigrations: ## Crear nuevas migraciones
	docker-compose exec backend python manage.py makemigrations

createsuperuser: ## Crear superusuario de Django
	docker-compose exec backend python manage.py createsuperuser

shell: ## Abrir shell de Django
	docker-compose exec backend python manage.py shell

backend-shell: ## Abrir shell bash en el contenedor del backend
	docker-compose exec backend sh

collectstatic: ## Recolectar archivos estáticos
	docker-compose exec backend python manage.py collectstatic --no-input

# Frontend commands
frontend-shell: ## Abrir shell bash en el contenedor del frontend
	docker-compose exec frontend sh

# Database commands
db-shell: ## Abrir shell de PostgreSQL
	docker-compose exec db psql -U byhormiga -d byhormiga

db-backup: ## Hacer backup de la base de datos
	docker-compose exec db pg_dump -U byhormiga byhormiga > backup_$$(date +%Y%m%d_%H%M%S).sql

db-restore: ## Restaurar base de datos desde backup (usar: make db-restore FILE=backup.sql)
	cat $(FILE) | docker-compose exec -T db psql -U byhormiga byhormiga

# Development commands
dev: up logs ## Levantar servicios y ver logs

fresh: down build up migrate ## Setup completo desde cero

# Testing
test: ## Ejecutar tests del backend
	docker-compose exec backend python manage.py test

# UV commands (local development sin Docker)
uv-install: ## Instalar dependencias con UV
	cd backend && uv pip install -r requirements.txt

uv-sync: ## Sincronizar dependencias con UV
	cd backend && uv pip sync requirements.txt

uv-add: ## Agregar paquete con UV (usar: make uv-add PKG=nombre_paquete)
	cd backend && uv pip install $(PKG) && uv pip freeze > requirements.txt
