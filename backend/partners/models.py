from django.db import models
from byhormiga.models import TimeStampMixin


class Partner(TimeStampMixin):
    """Modelo para marcas/partners con las que trabaja ByHormiga"""

    name = models.CharField(max_length=200, verbose_name="Nombre")
    logo = models.ImageField(upload_to="partners/logos/", verbose_name="Logo")
    website_url = models.URLField(
        blank=True, null=True, verbose_name="URL del sitio web"
    )
    order = models.PositiveIntegerField(
        default=0,
        verbose_name="Orden",
        help_text="Orden de aparición en el carrusel (menor número = primero)",
    )
    active = models.BooleanField(
        default=True,
        verbose_name="Activo",
        help_text="Marcar para mostrar en el carrusel",
    )

    class Meta:
        verbose_name = "Partner"
        verbose_name_plural = "Partners"
        ordering = ["order", "name"]

    def __str__(self):
        return self.name
