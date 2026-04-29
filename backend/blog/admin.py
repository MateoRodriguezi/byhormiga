from django.contrib import admin
from django.utils.html import format_html
from unfold.admin import ModelAdmin
from .models import Post


@admin.register(Post)
class PostAdmin(ModelAdmin):
    list_display = [
        "cover_thumbnail",
        "title",
        "excerpt_preview",
        "status_badge",
        "published_at",
    ]
    list_filter = ["status", "published_at", "created_at"]
    search_fields = ["title", "excerpt", "body"]
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ["cover_preview", "created_at", "updated_at"]
    date_hierarchy = "published_at"
    actions = ["mark_as_published", "mark_as_draft"]

    fieldsets = (
        ("Contenido", {"fields": ("title", "slug", "excerpt", "body")}),
        ("Visual", {"fields": ("cover", "cover_preview")}),
        ("Publicación", {"fields": ("status", "published_at")}),
        (
            "Metadatos",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )

    def cover_thumbnail(self, obj):
        """Muestra miniatura del cover en la lista"""
        if obj.cover:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 4px;" />',
                obj.cover.url,
            )
        return "-"

    cover_thumbnail.short_description = "Portada"

    def cover_preview(self, obj):
        """Muestra preview del cover en el detalle"""
        if obj.cover:
            return format_html(
                '<img src="{}" width="400" style="border-radius: 8px;" />',
                obj.cover.url,
            )
        return "No hay portada cargada"

    cover_preview.short_description = "Vista previa"

    def excerpt_preview(self, obj):
        """Muestra un extracto truncado del post"""
        max_length = 80
        if len(obj.excerpt) > max_length:
            return format_html(
                '<span title="{}">{}</span>',
                obj.excerpt,
                obj.excerpt[:max_length] + "...",
            )
        return obj.excerpt

    excerpt_preview.short_description = "Extracto"

    def status_badge(self, obj):
        """Muestra badge de status con colores"""
        colors = {
            "draft": "#6c757d",
            "published": "#28a745",
        }
        icons = {
            "draft": "📝",
            "published": "✓",
        }
        color = colors.get(obj.status, "#6c757d")
        icon = icons.get(obj.status, "")
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; border-radius: 3px; font-size: 11px; font-weight: bold;">{} {}</span>',
            color,
            icon,
            obj.get_status_display(),
        )

    status_badge.short_description = "Estado"

    @admin.action(description="✅ Publicar artículos")
    def mark_as_published(self, request, queryset):
        updated = queryset.update(status="published")
        self.message_user(request, f"{updated} artículo(s) publicado(s).")

    @admin.action(description="📝 Marcar como borrador")
    def mark_as_draft(self, request, queryset):
        updated = queryset.update(status="draft")
        self.message_user(request, f"{updated} artículo(s) marcado(s) como borrador.")
