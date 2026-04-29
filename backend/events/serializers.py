from rest_framework import serializers
from .models import Event, EventPhoto, Venue
from byhormiga.utils import SPANISH_MONTH_ABBR, format_spanish_month_year


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
    image = serializers.ImageField(source="poster", read_only=True)
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


class EventPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventPhoto
        fields = ["id", "image", "caption", "order"]


class GalleryEventSerializer(serializers.ModelSerializer):
    event_name = serializers.CharField(source="title", read_only=True)
    date = serializers.SerializerMethodField()
    photos = EventPhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = ["id", "event_name", "date", "photos"]

    def get_date(self, obj):
        return format_spanish_month_year(obj.date)
