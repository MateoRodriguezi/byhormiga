from rest_framework import serializers
from byhormiga.utils import build_media_proxy_url
from .models import AboutPage, Stat, StoryBlock


class StoryBlockSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = StoryBlock
        fields = ["title", "text", "image"]

    def get_image(self, obj):
        request = self.context.get("request")
        if not request or not obj.image:
            return None
        return build_media_proxy_url(request, obj.image.name)


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = ["value", "label", "description", "is_number"]


class AboutContentSerializer(serializers.Serializer):
    hero_title = serializers.CharField()
    story_blocks = StoryBlockSerializer(many=True)
    stats = StatSerializer(many=True)
