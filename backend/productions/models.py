from django.db import models
from django.utils.text import slugify
from byhormiga.models import TimeStampMixin


class Production(TimeStampMixin):
    """Marca/fiesta producida por ByHormiga (ej: Wonder, Mood, Hit The Beach)"""

    CATEGORY_CHOICES = [
        ("matinee", "Matineé"),
        ("plus15", "+15"),
        ("plus18", "+18"),
        ("coproduccion_internacional", "Co-Producciones"),
    ]

    name = models.CharField(max_length=200, verbose_name="Nombre")
    slug = models.SlugField(max_length=200, unique=True, blank=True, verbose_name="Slug")
    logo = models.ImageField(
        upload_to="productions/logos/", blank=True, verbose_name="Logo"
    )
    category = models.CharField(
        max_length=30, choices=CATEGORY_CHOICES, verbose_name="Categoría"
    )
    card_description = models.TextField(
        blank=True,
        verbose_name="Descripción corta",
        help_text="Se usa como descripción para buscadores (SEO), no se muestra en el sitio.",
    )
    hero_image = models.ImageField(
        upload_to="productions/hero/", blank=True, verbose_name="Foto de portada"
    )
    destacado = models.TextField(
        verbose_name="Texto destacado",
        help_text="Frase grande que se anima palabra por palabra. Solo texto plano, sin HTML.",
    )
    venues_intro = models.TextField(blank=True, verbose_name="Texto introductorio de venues")
    closing_text = models.TextField(blank=True, verbose_name="Texto de cierre")
    closing_image = models.ImageField(
        upload_to="productions/closing/", blank=True, verbose_name="Foto de cierre"
    )
    order = models.PositiveIntegerField(
        default=0,
        verbose_name="Orden",
        help_text="Orden de aparición dentro de su categoría (menor número = primero)",
    )

    class Meta:
        verbose_name = "Producción"
        verbose_name_plural = "Producciones"
        ordering = ["order", "name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            suffix = 2

            while Production.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{suffix}"
                suffix += 1

            self.slug = slug
        super().save(*args, **kwargs)


class ProductionSection(TimeStampMixin):
    """Bloque de contenido de una producción (texto + fotos, a un lado o a pantalla completa)"""

    SIDE_CHOICES = [
        ("left", "Foto a la izquierda"),
        ("right", "Foto a la derecha"),
        ("full", "Foto/video a pantalla completa"),
    ]

    production = models.ForeignKey(
        Production, on_delete=models.CASCADE, related_name="sections", verbose_name="Producción"
    )
    side = models.CharField(
        max_length=10, choices=SIDE_CHOICES, default="right", verbose_name="Posición"
    )
    text = models.TextField(blank=True, verbose_name="Texto")
    label = models.CharField(
        max_length=100,
        blank=True,
        verbose_name="Etiqueta",
        help_text="Solo se usa con 'Foto a pantalla completa'",
    )
    order = models.PositiveIntegerField(
        default=0,
        verbose_name="Orden",
        help_text="Orden de aparición dentro de la producción (menor número = primero)",
    )

    class Meta:
        verbose_name = "Sección de producción"
        verbose_name_plural = "Secciones de producción"
        ordering = ["production", "order"]

    def __str__(self):
        return f"{self.production} - Sección {self.order}"


class ProductionSectionImage(TimeStampMixin):
    """Foto de una sección. Si hay más de una, rotan en el sitio."""

    section = models.ForeignKey(
        ProductionSection, on_delete=models.CASCADE, related_name="images", verbose_name="Sección"
    )
    image = models.ImageField(upload_to="productions/sections/", verbose_name="Foto")
    order = models.PositiveIntegerField(
        default=0,
        verbose_name="Orden",
        help_text="Orden de rotación (menor número = primero)",
    )

    class Meta:
        verbose_name = "Foto de sección"
        verbose_name_plural = "Fotos de sección"
        ordering = ["order"]

    def __str__(self):
        return f"{self.section} - Foto {self.order}"


class ProductionVenue(TimeStampMixin):
    """Venue asociado a una producción"""

    production = models.ForeignKey(
        Production, on_delete=models.CASCADE, related_name="venues", verbose_name="Producción"
    )
    name = models.CharField(max_length=200, verbose_name="Nombre")
    image = models.ImageField(upload_to="productions/venues/", blank=True, verbose_name="Foto")
    order = models.PositiveIntegerField(
        default=0,
        verbose_name="Orden",
        help_text="Orden de aparición (menor número = primero)",
    )

    class Meta:
        verbose_name = "Venue de producción"
        verbose_name_plural = "Venues de producción"
        ordering = ["order"]

    def __str__(self):
        return f"{self.production} - {self.name}"
