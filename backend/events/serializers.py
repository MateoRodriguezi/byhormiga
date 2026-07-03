from rest_framework import serializers
from .models import Event, EventPhoto, Venue
from byhormiga.utils import (
    SPANISH_MONTH_ABBR,
    build_media_proxy_url,
    format_spanish_month_year,
)


class VenueSerializer(serializers.ModelSerializer):
    """Serializer para Venue"""

    class Meta:
        model = Venue
        fields = ["id", "name", "address", "city", "maps_url"]


class EventSerializer(serializers.ModelSerializer):
    """Serializer para Event con campos computados para el frontend"""

    venue = serializers.CharField(source="venue.name", read_only=True)
    venue_detail = VenueSerializer(source="venue", read_only=True)
    day = serializers.SerializerMethodField()
    month = serializers.SerializerMethodField()
    weekday = serializers.SerializerMethodField()
    status = serializers.CharField(source="frontend_status", read_only=True)
    image = serializers.SerializerMethodField()
    name = serializers.CharField(source="title", read_only=True)
    price = serializers.CharField(source="price_info", read_only=True)

    class Meta:
        model = Event
        fields = [
            "id",
            "slug",
            "name",
            "venue",
            "venue_detail",
            "date",
            "day",
            "month",
            "weekday",
            "price",
            "status",
            "featured",
            "description",
            "image",
            "ticket_url",
        ]

    def get_day(self, obj):
        return obj.date.strftime("%d")

    def get_month(self, obj):
        return SPANISH_MONTH_ABBR[obj.date.month]

    def get_weekday(self, obj):
        weekdays = {
            0: "LUN",
            1: "MAR",
            2: "MIÉ",
            3: "JUE",
            4: "VIE",
            5: "SÁB",
            6: "DOM",
        }
        return weekdays[obj.date.weekday()]

    def get_image(self, obj):
        request = self.context.get("request")
        if not request or not obj.poster:
            return None
        return build_media_proxy_url(request, obj.poster.name)


class EventPhotoSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = EventPhoto
        fields = ["id", "image", "caption", "order"]

    def get_image(self, obj):
        request = self.context.get("request")
        if not request or not obj.image:
            return None
        return build_media_proxy_url(request, obj.image.name)


class GalleryEventSerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(read_only=True)
    event_name = serializers.CharField(source="title", read_only=True)
    date = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    recap_video = serializers.SerializerMethodField()
    photos = EventPhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = ["id", "slug", "event_name", "date", "image", "recap_video", "photos"]

    def get_date(self, obj):
        return format_spanish_month_year(obj.date)

    def get_image(self, obj):
        request = self.context.get("request")
        if not request or not obj.poster:
            return None
        return build_media_proxy_url(request, obj.poster.name)

    def get_recap_video(self, obj):
        request = self.context.get("request")
        if not request or not obj.recap_video:
            return None
        return build_media_proxy_url(request, obj.recap_video.name)
