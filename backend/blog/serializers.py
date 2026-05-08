from rest_framework import serializers
from .models import Post
from byhormiga.utils import build_media_proxy_url


class PostSerializer(serializers.ModelSerializer):
    """Serializer para Post con campos para el frontend"""

    date = serializers.CharField(source="formatted_date", read_only=True)
    content = serializers.CharField(source="body", read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            "id",
            "slug",
            "title",
            "description",
            "content",
            "date",
            "image",
        ]

    def get_image(self, obj):
        request = self.context.get("request")
        if not request or not obj.cover:
            return None
        return build_media_proxy_url(request, obj.cover.name)
