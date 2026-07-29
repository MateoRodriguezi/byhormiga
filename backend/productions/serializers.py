from rest_framework import serializers
from byhormiga.utils import build_media_proxy_url
from .models import Production, ProductionSection, ProductionVenue


class ProductionListSerializer(serializers.ModelSerializer):
    """Serializer liviano para la grilla de /producciones"""

    logo = serializers.SerializerMethodField()
    hero_image = serializers.SerializerMethodField()

    class Meta:
        model = Production
        fields = ["slug", "name", "logo", "hero_image", "category"]

    def get_logo(self, obj):
        request = self.context.get("request")
        if not request or not obj.logo:
            return None
        return build_media_proxy_url(request, obj.logo.name)

    def get_hero_image(self, obj):
        request = self.context.get("request")
        if not request or not obj.hero_image:
            return None
        return build_media_proxy_url(request, obj.hero_image.name)


class ProductionSectionSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    class Meta:
        model = ProductionSection
        fields = ["side", "text", "label", "images"]

    def get_images(self, obj):
        request = self.context.get("request")
        if not request:
            return []
        return [
            build_media_proxy_url(request, image.image.name) for image in obj.images.all()
        ]


class ProductionVenueSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = ProductionVenue
        fields = ["name", "image"]

    def get_image(self, obj):
        request = self.context.get("request")
        if not request or not obj.image:
            return None
        return build_media_proxy_url(request, obj.image.name)


class ProductionDetailSerializer(serializers.ModelSerializer):
    """Serializer completo para /producciones/{slug}/"""

    logo = serializers.SerializerMethodField()
    hero_image = serializers.SerializerMethodField()
    closing_image = serializers.SerializerMethodField()
    sections = ProductionSectionSerializer(many=True, read_only=True)
    venues = ProductionVenueSerializer(many=True, read_only=True)

    class Meta:
        model = Production
        fields = [
            "slug",
            "name",
            "logo",
            "category",
            "card_description",
            "hero_image",
            "destacado",
            "venues_intro",
            "venues",
            "sections",
            "closing_text",
            "closing_image",
        ]

    def get_logo(self, obj):
        request = self.context.get("request")
        if not request or not obj.logo:
            return None
        return build_media_proxy_url(request, obj.logo.name)

    def get_hero_image(self, obj):
        request = self.context.get("request")
        if not request or not obj.hero_image:
            return None
        return build_media_proxy_url(request, obj.hero_image.name)

    def get_closing_image(self, obj):
        request = self.context.get("request")
        if not request or not obj.closing_image:
            return None
        return build_media_proxy_url(request, obj.closing_image.name)
