from django.contrib import admin
from .models import Post


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'published_at', 'created_at']
    list_filter = ['status', 'published_at', 'created_at']
    search_fields = ['title', 'excerpt', 'body']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['created_at', 'updated_at']
    date_hierarchy = 'published_at'

    fieldsets = (
        ('Contenido', {
            'fields': ('title', 'slug', 'excerpt', 'body')
        }),
        ('Visual', {
            'fields': ('cover',)
        }),
        ('Publicación', {
            'fields': ('status', 'published_at')
        }),
        ('Metadatos', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
