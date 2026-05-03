from django.db import models


class TeamMember(models.Model):
    """Modelo para miembros del equipo de ByHormiga"""
    name = models.CharField(
        max_length=200,
        verbose_name="Nombre completo"
    )
    role = models.CharField(
        max_length=100,
        verbose_name="Cargo/Rol"
    )
    bio = models.TextField(
        verbose_name="Biografía"
    )
    photo = models.ImageField(
        upload_to='team/',
        verbose_name="Foto"
    )
    order = models.PositiveIntegerField(
        default=0,
        verbose_name="Orden",
        help_text="Orden de aparición (menor número = primero)"
    )
    active = models.BooleanField(
        default=True,
        verbose_name="Activo",
        help_text="Marcar para mostrar en el sitio"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Miembro del Equipo"
        verbose_name_plural = "Miembros del Equipo"
        ordering = ['order', 'name']

    def __str__(self):
        return f"{self.name} - {self.role}"

