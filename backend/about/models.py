from django.db import models
from byhormiga.models import TimeStampMixin


class AboutPage(TimeStampMixin):
    """Configuración global de la página Nosotros (fila única)"""

    SINGLETON_ID = "about-page"

    hero_title = models.CharField(
        max_length=200,
        default="¿Quiénes somos?",
        verbose_name="Título principal",
        help_text="Título grande de la sección 'Quiénes somos' (Home y /nosotros)",
    )

    class Meta:
        verbose_name = "Página Nosotros"
        verbose_name_plural = "Página Nosotros"

    def __str__(self):
        return "Página Nosotros"

    def save(self, *args, **kwargs):
        self.pk = self.SINGLETON_ID
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=cls.SINGLETON_ID)
        return obj


class StoryBlock(TimeStampMixin):
    """Bloque de texto + fotos de la sección 'Quiénes somos' (Home y /nosotros)"""

    title = models.CharField(
        max_length=200,
        blank=True,
        verbose_name="Título",
        help_text="Dejar vacío para no mostrar título en este bloque",
    )
    text = models.TextField(verbose_name="Texto")
    order = models.PositiveIntegerField(
        default=0,
        verbose_name="Orden",
        help_text="Orden de aparición (menor número = primero)",
    )

    class Meta:
        verbose_name = "Bloque de historia"
        verbose_name_plural = "Bloques de historia"
        ordering = ["order"]

    def __str__(self):
        return self.title or f"Bloque {self.order}"


class StoryBlockImage(TimeStampMixin):
    """Foto de un bloque de historia. Si hay más de una, rotan en la Home."""

    story_block = models.ForeignKey(
        StoryBlock, on_delete=models.CASCADE, related_name="images", verbose_name="Bloque"
    )
    image = models.ImageField(upload_to="about/story/", verbose_name="Foto")
    order = models.PositiveIntegerField(
        default=0,
        verbose_name="Orden",
        help_text="Orden de rotación (menor número = primero)",
    )

    class Meta:
        verbose_name = "Foto de bloque"
        verbose_name_plural = "Fotos de bloque"
        ordering = ["order"]

    def __str__(self):
        return f"{self.story_block} - Foto {self.order}"


class Stat(TimeStampMixin):
    """Número destacado de la sección de estadísticas (Home y /nosotros)"""

    value = models.CharField(
        max_length=20,
        verbose_name="Valor",
        help_text="Ej: 200+, 150+, 200.000+",
    )
    label = models.CharField(max_length=100, verbose_name="Etiqueta")
    description = models.CharField(max_length=200, verbose_name="Descripción")
    is_number = models.BooleanField(
        default=True,
        verbose_name="Es numérico",
        help_text="Si está marcado, el valor se anima contando hasta el número al entrar en pantalla",
    )
    order = models.PositiveIntegerField(
        default=0,
        verbose_name="Orden",
        help_text="Orden de aparición (menor número = primero)",
    )

    class Meta:
        verbose_name = "Estadística"
        verbose_name_plural = "Estadísticas"
        ordering = ["order"]

    def __str__(self):
        return f"{self.value} {self.label}"
