from django.db import models
from byhormiga.models import TimeStampMixin


class ContactMessage(TimeStampMixin):
    """Modelo para mensajes del formulario de contacto"""

    name = models.CharField(max_length=200, verbose_name="Nombre")
    email = models.EmailField(verbose_name="Email")
    subject = models.CharField(max_length=300, verbose_name="Asunto")
    message = models.TextField(verbose_name="Mensaje")
    read = models.BooleanField(default=False, verbose_name="Leído")

    class Meta:
        verbose_name = "Mensaje de contacto"
        verbose_name_plural = "Mensajes de contacto"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} - {self.subject}"
