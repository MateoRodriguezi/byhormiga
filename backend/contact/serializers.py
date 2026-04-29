from rest_framework import serializers
from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    """Serializer para ContactMessage (solo escritura)"""

    class Meta:
        model = ContactMessage
        fields = ["name", "email", "subject", "message"]

    def create(self, validated_data):
        """Crea un nuevo mensaje de contacto"""
        return ContactMessage.objects.create(**validated_data)
