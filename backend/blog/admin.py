from django.contrib import admin
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.http import JsonResponse
from django.urls import path, reverse
from django.utils.html import format_html
from django.utils.text import get_valid_filename
from unfold.admin import ModelAdmin
from .models import Post


@admin.register(Post)
class PostAdmin(ModelAdmin):
    list_display = [
        "cover_thumbnail",
        "title",
        "description_preview",
        "status_badge",
        "published_at",
    ]
    list_filter = ["status", "published_at", "created_at"]
    search_fields = ["title", "description", "body"]
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ["cover_preview", "created_at", "updated_at"]
    date_hierarchy = "published_at"
    actions = ["mark_as_published", "mark_as_draft"]

    fieldsets = (
        (
            "Contenido",
            {
                "fields": ("title", "slug", "description", "body"),
                "description": "Editor HTML simple con preview y subida de imagenes.",
            },
        ),
        ("Visual", {"fields": ("cover", "cover_preview")}),
        ("Publicación", {"fields": ("status", "published_at")}),
        (
            "Metadatos",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )
    readonly_fields = ["cover_preview", "created_at", "updated_at"]

    class Media:
        js = ("blog/js/post_editor.js",)

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "upload-image/",
                self.admin_site.admin_view(self.upload_image_view),
                name="blog_post_upload_image",
            )
        ]
        return custom_urls + urls

    def render_change_form(
        self, request, context, add=False, change=False, form_url="", obj=None
    ):
        body_field = context.get("adminform").form.fields.get("body")
        if body_field:
            body_field.widget.attrs.update(
                {
                    "rows": 18,
                    "data-upload-url": reverse("admin:blog_post_upload_image"),
                }
            )
            body_field.help_text = "HTML permitido. Usa la barra para negrita, cursiva, H1/H2/H3, links e imagenes."
        return super().render_change_form(request, context, add, change, form_url, obj)

    def upload_image_view(self, request):
        if request.method != "POST":
            return JsonResponse({"detail": "Method not allowed"}, status=405)

        image = request.FILES.get("image")
        if not image:
            return JsonResponse({"detail": "No image provided"}, status=400)

        filename = get_valid_filename(image.name)
        storage_path = default_storage.save(
            f"blog/content/{filename}", ContentFile(image.read())
        )
        return JsonResponse({"url": default_storage.url(storage_path)})

    @admin.display(description="Portada")
    def cover_thumbnail(self, obj):
        """Muestra miniatura del cover en la lista"""
        if obj.cover:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 4px;" />',
                obj.cover.url,
            )
        return "-"

    @admin.display(description="Vista previa")
    def cover_preview(self, obj):
        """Muestra preview del cover en el detalle"""
        if obj.cover:
            return format_html(
                '<img src="{}" width="400" style="border-radius: 8px;" />',
                obj.cover.url,
            )
        return "No hay portada cargada"

    @admin.display(description="Extracto")
    def description_preview(self, obj):
        """Muestra un extracto truncado del post"""
        max_length = 80
        if len(obj.description) > max_length:
            return format_html(
                '<span title="{}">{}</span>',
                obj.description,
                obj.description[:max_length] + "...",
            )
        return obj.description

    @admin.display(description="Estado")
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

    @admin.action(description="✅ Publicar artículos")
    def mark_as_published(self, request, queryset):
        updated = queryset.update(status="published")
        self.message_user(request, f"{updated} artículo(s) publicado(s).")

    @admin.action(description="📝 Marcar como borrador")
    def mark_as_draft(self, request, queryset):
        updated = queryset.update(status="draft")
        self.message_user(request, f"{updated} artículo(s) marcado(s) como borrador.")
