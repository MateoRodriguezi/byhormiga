from rest_framework import serializers
from .models import Album, Photo


class PhotoSerializer(serializers.ModelSerializer):
    """Serializer para Photo"""

    class Meta:
        model = Photo
        fields = ["id", "image", "caption", "order"]


class AlbumSerializer(serializers.ModelSerializer):
    """Serializer para Album con fotos"""

    event_name = serializers.CharField(source="event.title", read_only=True)
    date = serializers.SerializerMethodField()
    photos = PhotoSerializer(many=True, read_only=True)
    image = serializers.ImageField(source="cover", read_only=True)

    class Meta:
        model = Album
        fields = ["id", "event_name", "date", "image", "photos"]

    def get_date(self, obj):
        """Formatea la fecha como 'MMM YYYY'"""
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
        return f"{months[obj.event.date.month]} {obj.event.date.year}"
