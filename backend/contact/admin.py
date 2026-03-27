from django.contrib import admin
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'read', 'created_at']
    list_filter = ['read', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']
    date_hierarchy = 'created_at'

    fieldsets = (
        ('Remitente', {
            'fields': ('name', 'email')
        }),
        ('Mensaje', {
            'fields': ('subject', 'message')
        }),
        ('Estado', {
            'fields': ('read', 'created_at')
        }),
    )

    def has_add_permission(self, request):
        """Prevent manual creation of contact messages"""
        return False

    def has_delete_permission(self, request, obj=None):
        """Allow deletion for cleanup"""
        return True

    actions = ['mark_as_read', 'mark_as_unread']

    @admin.action(description="Marcar como leído")
    def mark_as_read(self, request, queryset):
        updated = queryset.update(read=True)
        self.message_user(request, f"{updated} mensaje(s) marcado(s) como leído.")

    @admin.action(description="Marcar como no leído")
    def mark_as_unread(self, request, queryset):
        updated = queryset.update(read=False)
        self.message_user(request, f"{updated} mensaje(s) marcado(s) como no leído.")
