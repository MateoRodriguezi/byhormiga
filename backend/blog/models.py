from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from byhormiga.models import TimeStampMixin
from byhormiga.utils import format_spanish_date


class Post(TimeStampMixin):
    """Modelo para artículos de prensa/blog"""

    STATUS_CHOICES = [
        ("draft", "Borrador"),
        ("published", "Publicado"),
    ]

    title = models.CharField(max_length=300, verbose_name="Título")
    slug = models.SlugField(max_length=300, unique=True, verbose_name="Slug")
    description = models.TextField(
        max_length=500, verbose_name="Extracto", help_text="Resumen corto para listados"
    )
    body = models.TextField(verbose_name="Contenido")
    cover = models.ImageField(
        upload_to="blog/covers/",
        blank=True,
        null=True,
        verbose_name="Imagen de portada",
    )
    published_at = models.DateTimeField(
        default=timezone.now, verbose_name="Fecha de publicación"
    )
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="draft", verbose_name="Estado"
    )

    class Meta:
        verbose_name = "Artículo"
        verbose_name_plural = "Artículos"
        ordering = ["-published_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            suffix = 2

            while Post.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{suffix}"
                suffix += 1

            self.slug = slug
        super().save(*args, **kwargs)

    @property
    def formatted_date(self):
        """Formatea la fecha para el frontend (DD MMM YYYY)"""
        return format_spanish_date(self.published_at)
