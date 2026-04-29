from django.utils import timezone
from rest_framework import filters, generics
from django_filters.rest_framework import DjangoFilterBackend
from .models import Event
from .serializers import EventSerializer, GalleryEventSerializer


class EventListAPIView(generics.ListAPIView):
    """API endpoint para listado de eventos publicados."""

    queryset = Event.objects.filter(status="published").select_related("venue")
    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["featured"]
    ordering_fields = ["date"]
    ordering = ["date"]


class EventRetrieveAPIView(generics.RetrieveAPIView):
    """API endpoint para detalle de evento publicado."""

    queryset = Event.objects.filter(status="published").select_related("venue")
    serializer_class = EventSerializer
    lookup_field = "slug"


class EventFeaturedListAPIView(generics.ListAPIView):
    """API endpoint para eventos destacados publicados."""

    queryset = Event.objects.filter(status="published", featured=True).select_related(
        "venue"
    )
    serializer_class = EventSerializer
    ordering = ["date"]


class GalleryListAPIView(generics.ListAPIView):
    """API endpoint para galeria: eventos pasados con fotos."""

    serializer_class = GalleryEventSerializer

    def get_queryset(self):
        return (
            Event.objects.filter(
                status="published",
                date__lt=timezone.now(),
                photos__isnull=False,
            )
            .prefetch_related("photos")
            .order_by("-date")
            .distinct()
        )
