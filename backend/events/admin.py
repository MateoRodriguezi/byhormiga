from django.contrib import admin
from django.utils import timezone
from django.utils.html import format_html
from adminsortable2.admin import SortableAdminBase, SortableInlineAdminMixin
from unfold.admin import ModelAdmin, TabularInline
from .models import Event, EventPhoto, Venue


WEEKDAY_ABBR = {
    0: "LUN",
    1: "MAR",
    2: "MIÉ",
    3: "JUE",
    4: "VIE",
    5: "SÁB",
    6: "DOM",
}


class EventPhotoInline(SortableInlineAdminMixin, TabularInline):
    model = EventPhoto
    extra = 1
    fields = ["thumbnail", "image", "caption", "order"]
    readonly_fields = ["thumbnail"]
    ordering = ["order"]

    @admin.display(description="")
    def thumbnail(self, obj):
        """Miniatura de la foto para reconocerla de un vistazo al reordenar"""
        if obj.pk and obj.image:
            return format_html(
                '<img src="{}" width="56" height="56" style="object-fit: cover; border-radius: 4px;" />',
                obj.image.url,
            )
        return "—"


@admin.register(Venue)
class VenueAdmin(ModelAdmin):
    list_display = ["name", "city", "address", "event_count", "created_at"]
    search_fields = ["name", "address", "city"]
    list_filter = ["city", "created_at"]
    readonly_fields = ["event_count", "created_at", "updated_at"]

    fieldsets = (
        ("Información básica", {"fields": ("name", "city", "address", "maps_url")}),
        (
            "Metadatos",
            {
                "fields": ("event_count", "created_at", "updated_at"),
                "classes": ("collapse",),
            },
        ),
    )

    @admin.display(description="Eventos")
    def event_count(self, obj):
        """Muestra la cantidad de eventos en este venue"""
        count = obj.events.count()
        return format_html(
            '<span style="background-color: #3b82f6; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: bold;">{}</span>',
            count,
        )


@admin.register(Event)
class EventAdmin(SortableAdminBase, ModelAdmin):
    list_display = [
        "poster_thumbnail",
        "title",
        "formatted_date",
        "venue",
        "status",
        "featured",
        "visibility_info",
    ]
    list_display_links = ["title"]
    list_editable = ["status", "featured"]
    list_filter = ["status", "featured", "venue", "date"]
    search_fields = ["title", "description"]
    autocomplete_fields = ["venue"]
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ["poster_preview", "recap_video_preview", "created_at", "updated_at"]
    date_hierarchy = "date"
    inlines = [EventPhotoInline]
    actions = [
        "mark_as_published",
        "mark_as_draft",
        "mark_as_sold_out",
        "mark_as_cancelled",
        "mark_as_featured",
        "mark_as_not_featured",
    ]

    fieldsets = (
        (
            "Información básica",
            {"fields": ("title", "slug", "description", "featured")},
        ),
        (
            "Detalles del evento",
            {"fields": ("date", "venue", "price_info", "ticket_url")},
        ),
        (
            "Visual",
            {"fields": ("poster", "poster_preview", "recap_video", "recap_video_preview")},
        ),
        (
            "Estado",
            {
                "fields": ("status",),
                "description": (
                    "<strong>Publicado</strong>: aparece en /eventos como evento activo/en venta. "
                    "<strong>Borrador</strong>: no aparece en /eventos, pero si tiene fecha pasada y "
                    "fotos cargadas SI aparece en la Galeria de Momentos. Usa Borrador para cargar "
                    "solo el recap fotografico de un evento que ya paso."
                ),
            },
        ),
        (
            "Metadatos",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )

    @admin.display(description="Poster")
    def poster_thumbnail(self, obj):
        """Muestra miniatura del poster en la lista"""
        if obj.poster:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 4px;" />',
                obj.poster.url,
            )
        return "-"

    @admin.display(description="Vista previa")
    def poster_preview(self, obj):
        """Muestra preview del poster en el detalle"""
        if obj.poster:
            return format_html(
                '<img src="{}" width="300" style="border-radius: 8px;" />',
                obj.poster.url,
            )
        return "No hay poster cargado"

    @admin.display(description="Fecha")
    def formatted_date(self, obj):
        """Muestra fecha formateada con día de la semana"""
        weekday = WEEKDAY_ABBR[obj.date.weekday()]
        return format_html(
            "<strong>{}</strong><br><small>{} {} - {}:{}</small>",
            obj.date.strftime("%d/%m/%Y"),
            weekday,
            obj.date.strftime("%H:%M"),
            obj.date.strftime("%H"),
            obj.date.strftime("%M"),
        )

    @admin.display(description="Vista previa del video")
    def recap_video_preview(self, obj):
        """Muestra preview del video recap en el detalle"""
        if obj.recap_video:
            return format_html(
                '<video src="{}" width="300" controls style="border-radius: 8px;"></video>',
                obj.recap_video.url,
            )
        return "No hay video cargado"

    @admin.display(description="Dónde aparece")
    def visibility_info(self, obj):
        """Aclara si el evento se ve en /eventos, en Momentos, en ambos o en ninguno"""
        is_past = obj.date < timezone.now()
        has_photos = obj.photos.exists()
        in_eventos = obj.status == "published"
        in_momentos = is_past and has_photos

        if in_eventos and in_momentos:
            return format_html('<span style="color: #a855f7;">🎫🖼️ Eventos + Momentos</span>')
        if in_eventos:
            return format_html('<span style="color: #3b82f6;">🎫 Eventos</span>')
        if in_momentos:
            return format_html('<span style="color: #a855f7;">🖼️ Solo Momentos</span>')
        return format_html('<span style="color: #6b7280;">— Oculto</span>')

    @admin.action(description="✅ Marcar como publicado")
    def mark_as_published(self, request, queryset):
        updated = queryset.update(status="published")
        self.message_user(request, f"{updated} evento(s) marcado(s) como publicado.")

    @admin.action(description="📝 Marcar como borrador")
    def mark_as_draft(self, request, queryset):
        updated = queryset.update(status="draft")
        self.message_user(request, f"{updated} evento(s) marcado(s) como borrador.")

    @admin.action(description="🎫 Marcar como agotado")
    def mark_as_sold_out(self, request, queryset):
        updated = queryset.update(status="sold_out")
        self.message_user(request, f"{updated} evento(s) marcado(s) como agotado.")

    @admin.action(description="❌ Marcar como cancelado")
    def mark_as_cancelled(self, request, queryset):
        updated = queryset.update(status="cancelled")
        self.message_user(request, f"{updated} evento(s) marcado(s) como cancelado.")

    @admin.action(description="⭐ Marcar como destacado")
    def mark_as_featured(self, request, queryset):
        updated = queryset.update(featured=True)
        self.message_user(request, f"{updated} evento(s) marcado(s) como destacado.")

    @admin.action(description="⭐ Quitar destacado")
    def mark_as_not_featured(self, request, queryset):
        updated = queryset.update(featured=False)
        self.message_user(request, f"{updated} evento(s) desmarcado(s) como destacado.")
