from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):
    """Serializer para Post con campos para el frontend"""

    date = serializers.CharField(source="formatted_date", read_only=True)
    content = serializers.CharField(source="body", read_only=True)
    image = serializers.ImageField(source="cover", read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "slug",
            "title",
            "excerpt",
            "content",
            "date",
            "image",
        ]
