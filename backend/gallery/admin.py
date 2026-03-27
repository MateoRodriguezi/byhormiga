from django.contrib import admin
from adminsortable2.admin import SortableInlineAdminMixin, SortableAdminBase
from .models import Album, Photo


class PhotoInline(SortableInlineAdminMixin, admin.TabularInline):
    """Inline para fotos con drag-and-drop"""
    model = Photo
    extra = 1
    fields = ['image', 'caption', 'order']
    ordering = ['order']


@admin.register(Album)
class AlbumAdmin(SortableAdminBase, admin.ModelAdmin):
    list_display = ['event', 'photo_count', 'published', 'created_at']
    list_filter = ['published', 'created_at']
    search_fields = ['event__title']
    readonly_fields = ['photo_count', 'created_at', 'updated_at']
    inlines = [PhotoInline]

    fieldsets = (
        ('Evento', {
            'fields': ('event',)
        }),
        ('Visual', {
            'fields': ('cover', 'published')
        }),
        ('Metadatos', {
            'fields': ('photo_count', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ['album', 'caption', 'order', 'created_at']
    list_filter = ['album', 'created_at']
    search_fields = ['caption', 'album__event__title']
    list_editable = ['order']
    ordering = ['album', 'order']
