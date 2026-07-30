from django.utils import timezone
from rest_framework import filters, generics
from django_filters.rest_framework import DjangoFilterBackend
from .models import Event
from .serializers import EventSerializer, GalleryEventSerializer


class EventListAPIView(generics.ListAPIView):
    """API endpoint para listado de eventos publicados o agotados que todavia no empezaron."""

    serializer_class = EventSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["featured"]
    ordering_fields = ["date"]
    ordering = ["date"]

    def get_queryset(self):
        return Event.objects.filter(
            status__in=["published", "sold_out"], date__gte=timezone.now()
        ).select_related("venue")


class EventRetrieveAPIView(generics.RetrieveAPIView):
    """API endpoint para detalle de evento publicado o agotado."""

    queryset = Event.objects.filter(status__in=["published", "sold_out"]).select_related(
        "venue"
    )
    serializer_class = EventSerializer
    lookup_field = "slug"


class EventFeaturedListAPIView(generics.ListAPIView):
    """API endpoint para eventos destacados publicados o agotados que todavia no empezaron."""

    serializer_class = EventSerializer
    ordering = ["date"]

    def get_queryset(self):
        return Event.objects.filter(
            status__in=["published", "sold_out"],
            featured=True,
            date__gte=timezone.now(),
        ).select_related("venue")


class GalleryListAPIView(generics.ListAPIView):
    """API endpoint para galeria: eventos pasados con fotos."""

    serializer_class = GalleryEventSerializer

    def get_queryset(self):
        return (
            Event.objects.filter(
                date__lt=timezone.now(),
                photos__isnull=False,
            )
            .prefetch_related("photos")
            .order_by("-date")
            .distinct()
        )
