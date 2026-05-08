from rest_framework import serializers
from .models import Partner
from byhormiga.utils import build_media_proxy_url


class PartnerSerializer(serializers.ModelSerializer):
    """Serializer para Partners"""

    logo = serializers.SerializerMethodField()

    class Meta:
        model = Partner
        fields = [
            "id",
            "name",
            "logo",
            "website_url",
            "order",
        ]
        read_only_fields = ["id"]

    def get_logo(self, obj):
        request = self.context.get("request")
        if not request or not obj.logo:
            return None
        return build_media_proxy_url(request, obj.logo.name)
