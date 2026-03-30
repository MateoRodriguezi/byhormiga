from rest_framework import serializers
from .models import Partner


class PartnerSerializer(serializers.ModelSerializer):
    """Serializer para Partners"""

    class Meta:
        model = Partner
        fields = [
            'id',
            'name',
            'logo',
            'website_url',
            'order',
            'active',
        ]
        read_only_fields = ['id']
