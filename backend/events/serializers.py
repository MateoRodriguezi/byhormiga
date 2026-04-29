from rest_framework import serializers
from .models import Event, Venue


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
