from django.contrib import admin
from django.utils.html import format_html
from unfold.admin import ModelAdmin
from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(ModelAdmin):
    list_display = ["name", "email", "subject_preview", "read_badge", "created_at"]
    list_filter = ["read", "created_at"]
    search_fields = ["name", "email", "subject", "message"]
    readonly_fields = ["name", "email", "subject", "message_formatted", "created_at"]
    date_hierarchy = "created_at"

    fieldsets = (
        ("Remitente", {"fields": ("name", "email")}),
        ("Mensaje", {"fields": ("subject", "message_formatted")}),
        ("Estado", {"fields": ("read", "created_at")}),
    )

    def has_add_permission(self, request):
        """Prevent manual creation of contact messages"""
        return False

    def has_delete_permission(self, request, obj=None):
        """Allow deletion for cleanup"""
        return True

    actions = ["mark_as_read", "mark_as_unread"]

    def subject_preview(self, obj):
        """Muestra el asunto truncado si es muy largo"""
        max_length = 50
        if len(obj.subject) > max_length:
            return format_html(
                '<span title="{}">{}</span>',
                obj.subject,
                obj.subject[:max_length] + "...",
            )
        return obj.subject

    subject_preview.short_description = "Asunto"

    def message_formatted(self, obj):
        """Muestra el mensaje con formato mejorado"""
        return format_html(
            '<div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; white-space: pre-wrap;">{}</div>',
            obj.message,
        )

    message_formatted.short_description = "Mensaje"

    def read_badge(self, obj):
        """Muestra badge visual para estado de lectura"""
        if obj.read:
            return format_html(
                '<span style="background-color: #28a745; color: white; padding: 3px 10px; border-radius: 3px; font-size: 11px; font-weight: bold;">✓ Leído</span>'
            )
        return format_html(
            '<span style="background-color: #3b82f6; color: white; padding: 3px 10px; border-radius: 3px; font-size: 11px; font-weight: bold;">✉ Nuevo</span>'
        )

    read_badge.short_description = "Estado"

    @admin.action(description="✓ Marcar como leído")
    def mark_as_read(self, request, queryset):
        updated = queryset.update(read=True)
        self.message_user(request, f"{updated} mensaje(s) marcado(s) como leído.")

    @admin.action(description="✉ Marcar como no leído")
    def mark_as_unread(self, request, queryset):
        updated = queryset.update(read=False)
        self.message_user(request, f"{updated} mensaje(s) marcado(s) como no leído.")
