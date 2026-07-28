from django.contrib import admin
from django.shortcuts import redirect
from django.urls import path, reverse
from django.utils.html import format_html
from adminsortable2.admin import SortableAdminMixin
from unfold.admin import ModelAdmin
from byhormiga.utils import handle_admin_rich_text_image_upload
from .models import AboutPage, Stat, StoryBlock


@admin.register(AboutPage)
class AboutPageAdmin(ModelAdmin):
    """Fila única de configuración global de /nosotros"""

    fields = ["hero_title"]

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        obj = AboutPage.load()
        return redirect(reverse("admin:about_aboutpage_change", args=[obj.pk]))


@admin.register(StoryBlock)
class StoryBlockAdmin(SortableAdminMixin, ModelAdmin):
    list_display = ["image_thumbnail", "title", "order"]
    list_editable = ["order"]
    readonly_fields = ["image_preview", "created_at", "updated_at"]

    fieldsets = (
        (
            "Contenido",
            {
                "fields": ("title", "text"),
                "description": "Editor HTML simple con preview y subida de imagenes.",
            },
        ),
        ("Foto", {"fields": ("image", "image_preview")}),
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

    class Media:
        js = ("admin_overrides/js/rich_text_editor.js",)

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "upload-image/",
                self.admin_site.admin_view(self.upload_image_view),
                name="about_storyblock_upload_image",
            )
        ]
        return custom_urls + urls

    def render_change_form(
        self, request, context, add=False, change=False, form_url="", obj=None
    ):
        text_field = context.get("adminform").form.fields.get("text")
        if text_field:
            text_field.widget.attrs.update(
                {
                    "rows": 14,
                    "data-rich-text-editor": "true",
                    "data-upload-url": reverse("admin:about_storyblock_upload_image"),
                }
            )
            text_field.help_text = "HTML permitido. Usa la barra para negrita, cursiva, H1/H2/H3, links e imagenes."
        return super().render_change_form(request, context, add, change, form_url, obj)

    def upload_image_view(self, request):
        return handle_admin_rich_text_image_upload(request, "about/content")

    @admin.display(description="Foto")
    def image_thumbnail(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 4px;" />',
                obj.image.url,
            )
        return "-"

    @admin.display(description="Vista previa")
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="300" style="border-radius: 8px;" />',
                obj.image.url,
            )
        return "No hay foto cargada"


@admin.register(Stat)
class StatAdmin(SortableAdminMixin, ModelAdmin):
    list_display = ["value", "label", "description", "is_number", "order"]
    list_editable = ["order"]
    fields = ["value", "label", "description", "is_number", "order"]
