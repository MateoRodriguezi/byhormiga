# syntax=docker/dockerfile:1

FROM python:3.11-slim AS base

COPY --from=ghcr.io/astral-sh/uv:0.11.7 /uv /uvx /bin/

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    UV_LINK_MODE=copy \
    UV_COMPILE_BYTECODE=1

WORKDIR /app

FROM base AS deps

RUN --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --locked --no-install-project --no-dev

FROM base AS development

COPY --from=deps /app/.venv /app/.venv
COPY . /app

ENV PATH="/app/.venv/bin:$PATH"

RUN uv sync --locked --no-install-project --no-dev

EXPOSE 8000

CMD ["uv", "run", "--no-sync", "python", "manage.py", "runserver", "0.0.0.0:8000"]

FROM base AS production

COPY --from=deps /app/.venv /app/.venv
COPY . /app

ENV PATH="/app/.venv/bin:$PATH"

RUN uv sync --locked --no-install-project --no-dev

RUN useradd -m -u 1000 django && chown -R django:django /app

USER django

RUN uv run --no-sync python manage.py collectstatic --no-input

EXPOSE 8000

CMD ["uv", "run", "--no-sync", "gunicorn", "byhormiga.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "4", "--timeout", "120", "--access-logfile", "-", "--error-logfile", "-"]
