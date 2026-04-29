from django.db import models
from events.models import Event


class Album(models.Model):
    """Modelo para álbumes de fotos de eventos"""

    event = models.OneToOneField(
        Event, on_delete=models.CASCADE, related_name="album", verbose_name="Evento"
    )
    cover = models.ImageField(
        upload_to="gallery/covers/", blank=True, null=True, verbose_name="Portada"
    )
    published = models.BooleanField(default=False, verbose_name="Publicado")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Álbum"
        verbose_name_plural = "Álbumes"
        ordering = ["-event__date"]

    def __str__(self):
        return f"Álbum: {self.event.title}"

    @property
    def photo_count(self):
        return self.photos.count()


class Photo(models.Model):
    """Modelo para fotos individuales en un álbum"""

    album = models.ForeignKey(
        Album, on_delete=models.CASCADE, related_name="photos", verbose_name="Álbum"
    )
    image = models.ImageField(upload_to="gallery/photos/", verbose_name="Imagen")
    caption = models.CharField(max_length=300, blank=True, verbose_name="Caption")
    order = models.PositiveIntegerField(
        default=0, verbose_name="Orden", help_text="Orden de aparición en la galería"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Foto"
        verbose_name_plural = "Fotos"
        ordering = ["order", "-created_at"]

    def __str__(self):
        return f"{self.album.event.title} - Foto {self.order}"
