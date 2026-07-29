from django.contrib import admin
from django.urls import path, reverse
from django.utils.html import format_html
from adminsortable2.admin import SortableAdminMixin, SortableInlineAdminMixin
from unfold.admin import ModelAdmin, TabularInline
from byhormiga.utils import handle_admin_rich_text_image_upload
from .models import Production, ProductionSection, ProductionSectionImage, ProductionVenue


class ProductionVenueInline(SortableInlineAdminMixin, TabularInline):
    model = ProductionVenue
    extra = 1
    fields = ["thumbnail", "name", "image", "order"]
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


class ProductionSectionImageInline(SortableInlineAdminMixin, TabularInline):
    model = ProductionSectionImage
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


@admin.register(Production)
class ProductionAdmin(SortableAdminMixin, ModelAdmin):
    list_display = ["logo_thumbnail", "name", "category", "order"]
    list_filter = ["category"]
    list_editable = ["order"]
    search_fields = ["name"]
    prepopulated_fields = {"slug": ("name",)}
    readonly_fields = [
        "logo_preview",
        "hero_preview",
        "closing_preview",
        "created_at",
        "updated_at",
    ]
    inlines = [ProductionVenueInline]

    fieldsets = (
        ("Información básica", {"fields": ("name", "slug", "category", "card_description")}),
        ("Logo", {"fields": ("logo", "logo_preview")}),
        ("Portada", {"fields": ("hero_image", "hero_preview")}),
        ("Texto destacado", {"fields": ("destacado",)}),
        ("Venues", {"fields": ("venues_intro",)}),
        ("Cierre", {"fields": ("closing_text", "closing_image", "closing_preview")}),
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
        if obj.logo:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit: contain; border-radius: 4px; background: white; padding: 4px;" />',
                obj.logo.url,
            )
        return "-"

    @admin.display(description="Vista previa")
    def logo_preview(self, obj):
        if obj.logo:
            return format_html(
                '<img src="{}" width="200" style="border-radius: 8px; background: white; padding: 10px;" />',
                obj.logo.url,
            )
        return "No hay logo cargado"

    @admin.display(description="Vista previa")
    def hero_preview(self, obj):
        if obj.hero_image:
            return format_html(
                '<img src="{}" width="300" style="border-radius: 8px;" />', obj.hero_image.url
            )
        return "No hay foto cargada"

    @admin.display(description="Vista previa")
    def closing_preview(self, obj):
        if obj.closing_image:
            return format_html(
                '<img src="{}" width="300" style="border-radius: 8px;" />', obj.closing_image.url
            )
        return "No hay foto cargada"


@admin.register(ProductionSection)
class ProductionSectionAdmin(SortableAdminMixin, ModelAdmin):
    list_display = ["production", "side", "photo_count", "order"]
    list_filter = ["production", "side"]
    list_editable = ["order"]
    readonly_fields = ["created_at", "updated_at"]
    inlines = [ProductionSectionImageInline]

    fieldsets = (
        (
            "Contenido",
            {
                "fields": ("production", "side", "label", "text"),
                "description": "Editor HTML simple con preview y subida de imagenes. 'Etiqueta' solo se usa con 'Foto a pantalla completa'. Las fotos se cargan mas abajo — si cargas mas de una, van a rotar.",
            },
        ),
        (
            "Orden",
            {
                "fields": ("order",),
                "description": "Filtra por producción arriba a la derecha para reordenar solo sus secciones",
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
                name="productions_productionsection_upload_image",
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
                    "data-upload-url": reverse(
                        "admin:productions_productionsection_upload_image"
                    ),
                }
            )
            text_field.help_text = "HTML permitido. Usa la barra para negrita, cursiva, H1/H2/H3, links e imagenes."
        return super().render_change_form(request, context, add, change, form_url, obj)

    def upload_image_view(self, request):
        return handle_admin_rich_text_image_upload(request, "productions/content")

    @admin.display(description="Fotos")
    def photo_count(self, obj):
        count = obj.images.count()
        return format_html(
            '<span style="background-color: #3b82f6; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: bold;">{}</span>',
            count,
        )
