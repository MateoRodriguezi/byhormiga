from django.contrib import admin
from django.utils.html import format_html
from adminsortable2.admin import SortableInlineAdminMixin, SortableAdminBase
from unfold.admin import ModelAdmin, TabularInline
from .models import Album, Photo


class PhotoInline(SortableInlineAdminMixin, TabularInline):
    """Inline para fotos con drag-and-drop"""

    model = Photo
    extra = 1
    fields = ["image_preview", "image", "caption", "order"]
    readonly_fields = ["image_preview"]
    ordering = ["order"]

    def image_preview(self, obj):
        """Muestra preview de la imagen en el inline"""
        if obj.image:
            return format_html(
                '<img src="{}" width="60" height="60" style="object-fit: cover; border-radius: 4px;" />',
                obj.image.url,
            )
        return "-"

    image_preview.short_description = "Preview"


@admin.register(Album)
class AlbumAdmin(SortableAdminBase, ModelAdmin):
    list_display = [
        "event",
        "cover_thumbnail",
        "photo_count_badge",
        "published_badge",
        "created_at",
    ]
    list_filter = ["published", "created_at"]
    search_fields = ["event__title"]
    readonly_fields = ["cover_preview", "photo_count", "created_at", "updated_at"]
    inlines = [PhotoInline]
    actions = ["mark_as_published", "mark_as_unpublished"]

    fieldsets = (
        ("Evento", {"fields": ("event",)}),
        ("Visual", {"fields": ("cover", "cover_preview", "published")}),
        (
            "Metadatos",
            {
                "fields": ("photo_count", "created_at", "updated_at"),
                "classes": ("collapse",),
            },
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
                '<img src="{}" width="300" style="border-radius: 8px;" />',
                obj.cover.url,
            )
        return "No hay portada cargada"

    cover_preview.short_description = "Vista previa"

    def photo_count_badge(self, obj):
        """Muestra la cantidad de fotos con badge"""
        count = obj.photo_count
        color = "#28a745" if count > 0 else "#6c757d"
        return format_html(
            '<span style="background-color: {}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: bold;">{} fotos</span>',
            color,
            count,
        )

    photo_count_badge.short_description = "Fotos"

    def published_badge(self, obj):
        """Muestra badge de publicado"""
        if obj.published:
            return format_html(
                '<span style="background-color: #28a745; color: white; padding: 3px 10px; border-radius: 3px; font-size: 11px; font-weight: bold;">✓ Publicado</span>'
            )
        return format_html(
            '<span style="background-color: #6c757d; color: white; padding: 3px 10px; border-radius: 3px; font-size: 11px; font-weight: bold;">✗ No publicado</span>'
        )

    published_badge.short_description = "Estado"

    @admin.action(description="✅ Publicar álbumes")
    def mark_as_published(self, request, queryset):
        updated = queryset.update(published=True)
        self.message_user(request, f"{updated} álbum(es) publicado(s).")

    @admin.action(description="❌ Despublicar álbumes")
    def mark_as_unpublished(self, request, queryset):
        updated = queryset.update(published=False)
        self.message_user(request, f"{updated} álbum(es) despublicado(s).")


@admin.register(Photo)
class PhotoAdmin(ModelAdmin):
    list_display = ["image_thumbnail", "album", "caption", "order", "created_at"]
    list_filter = ["album", "created_at"]
    search_fields = ["caption", "album__event__title"]
    list_editable = ["order"]
    ordering = ["album", "order"]
    readonly_fields = ["image_preview"]

    fieldsets = (
        ("Álbum", {"fields": ("album",)}),
        ("Imagen", {"fields": ("image", "image_preview", "caption")}),
        ("Orden", {"fields": ("order",)}),
    )

    def image_thumbnail(self, obj):
        """Muestra miniatura de la imagen en la lista"""
        if obj.image:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 4px;" />',
                obj.image.url,
            )
        return "-"

    image_thumbnail.short_description = "Imagen"

    def image_preview(self, obj):
        """Muestra preview de la imagen en el detalle"""
        if obj.image:
            return format_html(
                '<img src="{}" width="400" style="border-radius: 8px;" />',
                obj.image.url,
            )
        return "No hay imagen cargada"

    image_preview.short_description = "Vista previa"
