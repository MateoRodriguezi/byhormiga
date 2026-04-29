from django.contrib import admin
from django.utils.html import format_html
from adminsortable2.admin import SortableAdminMixin
from unfold.admin import ModelAdmin
from .models import Partner


@admin.register(Partner)
class PartnerAdmin(SortableAdminMixin, ModelAdmin):
    list_display = [
        "logo_thumbnail",
        "name",
        "website_link",
        "active_badge",
        "order",
        "created_at",
    ]
    list_filter = ["active", "created_at"]
    search_fields = ["name"]
    readonly_fields = ["logo_preview", "created_at", "updated_at"]
    list_editable = ["order"]
    actions = ["mark_as_active", "mark_as_inactive"]

    fieldsets = (
        ("Información básica", {"fields": ("name", "website_url", "active")}),
        ("Logo", {"fields": ("logo", "logo_preview")}),
        (
            "Orden",
            {
                "fields": ("order",),
                "description": "Arrastra las filas en la lista para reordenar (también puedes editar el número)",
            },
        ),
        (
            "Metadatos",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )

    @admin.display(description="Logo")
    def logo_thumbnail(self, obj):
        """Muestra miniatura del logo en la lista"""
        if obj.logo:
            return format_html(
                '<img src="{}" width="60" height="60" style="object-fit: contain; border-radius: 4px; background: white; padding: 5px;" />',
                obj.logo.url,
            )
        return "-"

    @admin.display(description="Vista previa")
    def logo_preview(self, obj):
        """Muestra preview del logo en el detalle"""
        if obj and obj.logo:
            return format_html(
                '<img src="{}" width="200" style="border-radius: 8px; background: white; padding: 10px;" />',
                obj.logo.url,
            )
        return "No hay logo cargado"

    @admin.display(description="Sitio web")
    def website_link(self, obj):
        """Muestra link clickeable al sitio web"""
        if obj.website_url:
            return format_html(
                '<a href="{}" target="_blank" style="color: #3b82f6;">🔗 Visitar sitio</a>',
                obj.website_url,
            )
        return "-"

    @admin.display(description="Estado")
    def active_badge(self, obj):
        """Muestra badge de estado activo/inactivo"""
        if obj.active:
            return format_html(
                '<span style="background-color: #28a745; color: white; padding: 3px 10px; border-radius: 3px; font-size: 11px; font-weight: bold;">✓ Activo</span>'
            )
        return format_html(
            '<span style="background-color: #6c757d; color: white; padding: 3px 10px; border-radius: 3px; font-size: 11px; font-weight: bold;">✗ Inactivo</span>'
        )

    @admin.action(description="✅ Marcar como activo")
    def mark_as_active(self, request, queryset):
        updated = queryset.update(active=True)
        self.message_user(request, f"{updated} partner(s) marcado(s) como activo.")

    @admin.action(description="❌ Marcar como inactivo")
    def mark_as_inactive(self, request, queryset):
        updated = queryset.update(active=False)
        self.message_user(request, f"{updated} partner(s) marcado(s) como inactivo.")
