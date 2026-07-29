from rest_framework import serializers
from byhormiga.utils import build_media_proxy_url
from .models import AboutPage, Stat, StoryBlock


class StoryBlockSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    class Meta:
        model = StoryBlock
        fields = ["title", "text", "images"]

    def get_images(self, obj):
        request = self.context.get("request")
        if not request:
            return []
        return [
            build_media_proxy_url(request, image.image.name)
            for image in obj.images.all()
        ]


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = ["value", "label", "description", "is_number"]


class AboutContentSerializer(serializers.Serializer):
    hero_title = serializers.CharField()
    story_blocks = StoryBlockSerializer(many=True)
    stats = StatSerializer(many=True)
