from django.contrib import admin
from django.utils.html import format_html
from .models import Venue, Event


@admin.register(Venue)
class VenueAdmin(admin.ModelAdmin):
    list_display = ['name', 'city', 'address', 'created_at']
    search_fields = ['name', 'address', 'city']
    list_filter = ['city', 'created_at']
    readonly_fields = ['created_at', 'updated_at']

    fieldsets = (
        ('Información básica', {
            'fields': ('name', 'city', 'address', 'maps_url')
        }),
        ('Metadatos', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = [
        'poster_thumbnail',
        'title',
        'venue',
        'date',
        'status_badge',
        'featured',
    ]
    list_filter = ['status', 'featured', 'venue', 'date']
    search_fields = ['title', 'description']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['poster_preview', 'created_at', 'updated_at']
    date_hierarchy = 'date'

    fieldsets = (
        ('Información básica', {
            'fields': ('title', 'slug', 'description', 'featured')
        }),
        ('Detalles del evento', {
            'fields': ('date', 'venue', 'price_info', 'ticket_url')
        }),
        ('Visual', {
            'fields': ('poster', 'poster_preview')
        }),
        ('Estado', {
            'fields': ('status',)
        }),
        ('Metadatos', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def poster_thumbnail(self, obj):
        """Muestra miniatura del poster en la lista"""
        if obj.poster:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 4px;" />',
                obj.poster.url
            )
        return '-'
    poster_thumbnail.short_description = 'Poster'

    def poster_preview(self, obj):
        """Muestra preview del poster en el detalle"""
        if obj.poster:
            return format_html(
                '<img src="{}" width="300" style="border-radius: 8px;" />',
                obj.poster.url
            )
        return 'No hay poster cargado'
    poster_preview.short_description = 'Vista previa'

    def status_badge(self, obj):
        """Muestra badge de status con colores"""
        colors = {
            'draft': '#6c757d',
            'published': '#28a745',
            'cancelled': '#dc3545',
            'sold_out': '#ffc107',
        }
        color = colors.get(obj.status, '#6c757d')
        return format_html(
            '<span style="background-color: {}; color: white; padding: 3px 10px; border-radius: 3px; font-size: 11px; font-weight: bold;">{}</span>',
            color,
            obj.get_status_display()
        )
    status_badge.short_description = 'Estado'
