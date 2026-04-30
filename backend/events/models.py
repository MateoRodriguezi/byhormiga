from django.db import models
from django.utils.text import slugify
from byhormiga.models import TimeStampMixin


class Venue(TimeStampMixin):
    """Modelo para venues/lugares de eventos"""

    name = models.CharField(max_length=200, verbose_name="Nombre")
    address = models.CharField(max_length=300, verbose_name="Dirección")
    city = models.CharField(max_length=100, default="Montevideo", verbose_name="Ciudad")
    maps_url = models.URLField(blank=True, null=True, verbose_name="URL Google Maps")

    class Meta:
        verbose_name = "Venue"
        verbose_name_plural = "Venues"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Event(TimeStampMixin):
    """Modelo para eventos"""

    STATUS_CHOICES = [
        ("draft", "Borrador"),
        ("published", "Publicado"),
        ("cancelled", "Cancelado"),
        ("sold_out", "Agotado"),
    ]

    title = models.CharField(max_length=200, verbose_name="Título")
    slug = models.SlugField(max_length=200, unique=True, verbose_name="Slug")
    description = models.TextField(verbose_name="Descripción")
    date = models.DateTimeField(verbose_name="Fecha y hora")
    venue = models.ForeignKey(
        Venue, on_delete=models.PROTECT, related_name="events", verbose_name="Venue"
    )
    poster = models.ImageField(
        upload_to="events/posters/",
        blank=True,
        null=True,
        verbose_name="Poster",
    )
    ticket_url = models.URLField(blank=True, null=True, verbose_name="URL de tickets")
    price_info = models.CharField(
        max_length=200, blank=True, verbose_name="Información de precio"
    )
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default="draft", verbose_name="Estado"
    )
    featured = models.BooleanField(
        default=False,
        verbose_name="Destacado",
        help_text="Marcar si el evento debe aparecer destacado",
    )

    class Meta:
        verbose_name = "Evento"
        verbose_name_plural = "Eventos"
        ordering = ["-date"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            suffix = 2

            while Event.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{suffix}"
                suffix += 1

            self.slug = slug
        super().save(*args, **kwargs)

    @property
    def frontend_status(self):
        """Mapea el status de Django al formato del frontend"""
        status_map = {
            "published": "en-venta",
            "sold_out": "agotado",
            "draft": "proximamente",
            "cancelled": "proximamente",
        }
        return status_map.get(self.status, "proximamente")


class EventPhoto(TimeStampMixin):
    """Modelo para fotos de galeria asociadas a un evento"""

    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="photos",
        verbose_name="Evento",
    )
    image = models.ImageField(upload_to="events/photos/", verbose_name="Imagen")
    caption = models.CharField(max_length=300, blank=True, verbose_name="Caption")
    order = models.PositiveIntegerField(
        default=0,
        verbose_name="Orden",
        help_text="Orden de aparicion en la galeria",
    )

    class Meta:
        verbose_name = "Foto de evento"
        verbose_name_plural = "Fotos de eventos"
        ordering = ["order", "-created_at"]
        constraints = [
            models.UniqueConstraint(
                fields=["event", "order"], name="unique_event_photo_order"
            )
        ]

    def __str__(self):
        return f"{self.event.title} - Foto {self.order}"
