from django.utils import timezone
from rest_framework import filters, generics, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Event
from .serializers import EventSerializer, GalleryEventSerializer


class EventViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint para eventos.
    - List: GET /api/events/
    - Detail: GET /api/events/{slug}/
    - Featured: GET /api/events/featured/
    """

    queryset = Event.objects.filter(status="published").select_related("venue")
    serializer_class = EventSerializer
    lookup_field = "slug"
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["featured", "status"]
    ordering_fields = ["date"]
    ordering = ["date"]

    @action(detail=False, methods=["get"])
    def featured(self, request):
        """Retorna solo eventos destacados"""
        featured_events = self.queryset.filter(featured=True)
        serializer = self.get_serializer(featured_events, many=True)
        return Response(serializer.data)


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
