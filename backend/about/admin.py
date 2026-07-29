from django.contrib import admin
from django.shortcuts import redirect
from django.urls import path, reverse
from django.utils.html import format_html
from adminsortable2.admin import SortableAdminMixin, SortableInlineAdminMixin
from unfold.admin import ModelAdmin, TabularInline
from byhormiga.utils import handle_admin_rich_text_image_upload
from .models import AboutPage, Stat, StoryBlock, StoryBlockImage


class StoryBlockImageInline(SortableInlineAdminMixin, TabularInline):
    model = StoryBlockImage
    extra = 1
    fields = ["thumbnail", "image", "order"]
    readonly_fields = ["thumbnail"]
    ordering = ["order"]

    @admin.display(description="")
    def thumbnail(self, obj):
        if obj.pk and obj.image:
            return format_html(
                '<img src="{}" width="56" height="56" style="object-fit: cover; border-radius: 4px;" />',
                obj.image.url,
            )
        return "—"


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
    list_display = ["title", "photo_count", "order"]
    list_editable = ["order"]
    readonly_fields = ["created_at", "updated_at"]
    inlines = [StoryBlockImageInline]

    fieldsets = (
        (
            "Contenido",
            {
                "fields": ("title", "text"),
                "description": "Editor HTML simple con preview y subida de imagenes. Las fotos se cargan mas abajo — si cargas mas de una, van a rotar en la Home.",
            },
        ),
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

    @admin.display(description="Fotos")
    def photo_count(self, obj):
        count = obj.images.count()
        return format_html(
            '<span style="background-color: #3b82f6; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: bold;">{}</span>',
            count,
        )


@admin.register(Stat)
class StatAdmin(SortableAdminMixin, ModelAdmin):
    list_display = ["value", "label", "description", "is_number", "order"]
    list_editable = ["order"]
    fields = ["value", "label", "description", "is_number", "order"]
