from django.contrib import admin
from django.utils.html import format_html
from unfold.admin import ModelAdmin
from .models import Venue, Event


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

    def event_count(self, obj):
        """Muestra la cantidad de eventos en este venue"""
        count = obj.events.count()
        return format_html(
            '<span style="background-color: #3b82f6; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: bold;">{}</span>',
            count,
        )

    event_count.short_description = "Eventos"


@admin.register(Event)
class EventAdmin(ModelAdmin):
    list_display = [
        "poster_thumbnail",
        "title",
        "formatted_date",
        "venue",
        "status_badge",
        "featured_badge",
    ]
    list_filter = ["status", "featured", "venue", "date"]
    search_fields = ["title", "description"]
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ["poster_preview", "created_at", "updated_at"]
    date_hierarchy = "date"
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
        ("Visual", {"fields": ("poster", "poster_preview")}),
        ("Estado", {"fields": ("status",)}),
        (
            "Metadatos",
            {"fields": ("created_at", "updated_at"), "classes": ("collapse",)},
        ),
    )

    def poster_thumbnail(self, obj):
        """Muestra miniatura del poster en la lista"""
        if obj.poster:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 4px;" />',
                obj.poster.url,
            )
        return "-"

    poster_thumbnail.short_description = "Poster"

    def poster_preview(self, obj):
        """Muestra preview del poster en el detalle"""
        if obj.poster:
            return format_html(
                '<img src="{}" width="300" style="border-radius: 8px;" />',
                obj.poster.url,
            )
        return "No hay poster cargado"

    poster_preview.short_description = "Vista previa"

    def formatted_date(self, obj):
        """Muestra fecha formateada con día de la semana"""
        return format_html(
            "<strong>{}</strong><br><small>{} {} - {}:{}</small>",
            obj.date.strftime("%d/%m/%Y"),
            obj.weekday,
            obj.date.strftime("%H:%M"),
            obj.date.strftime("%H"),
            obj.date.strftime("%M"),
        )

    formatted_date.short_description = "Fecha"

    def status_badge(self, obj):
        """Muestra badge de status con colores"""
        colors = {
            "draft": "#6c757d",
            "published": "#28a745",
            "cancelled": "#dc3545",
            "sold_out": "#ffc107",
        }
        color = colors.get(obj.status, "#6c757d")
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; border-radius: 3px; font-size: 11px; font-weight: bold;">{}</span>',
            color,
            obj.get_status_display(),
        )

    status_badge.short_description = "Estado"

    def featured_badge(self, obj):
        """Muestra si el evento está destacado"""
        if obj.featured:
            return format_html('<span style="color: #fbbf24;">⭐ Destacado</span>')
        return "-"

    featured_badge.short_description = "Destacado"

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
