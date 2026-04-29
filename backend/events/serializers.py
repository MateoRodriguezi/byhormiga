from rest_framework import serializers
from .models import Event, EventPhoto, Venue


class VenueSerializer(serializers.ModelSerializer):
    """Serializer para Venue"""

    class Meta:
        model = Venue
        fields = ["id", "name", "address", "city", "maps_url"]


class EventSerializer(serializers.ModelSerializer):
    """Serializer para Event con campos computados para el frontend"""

    venue = serializers.CharField(source="venue.name", read_only=True)
    venue_detail = VenueSerializer(source="venue", read_only=True)
    day = serializers.ReadOnlyField()
    month = serializers.ReadOnlyField()
    weekday = serializers.ReadOnlyField()
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
        months = {
            1: "ENE",
            2: "FEB",
            3: "MAR",
            4: "ABR",
            5: "MAY",
            6: "JUN",
            7: "JUL",
            8: "AGO",
            9: "SEP",
            10: "OCT",
            11: "NOV",
            12: "DIC",
        }
        return f"{months[obj.date.month]} {obj.date.year}"
