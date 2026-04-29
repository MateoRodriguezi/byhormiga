from rest_framework import viewsets
from .models import Album
from .serializers import AlbumSerializer


class AlbumViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint para álbumes de galería.
    - List: GET /api/gallery/
    - Detail: GET /api/gallery/{id}/
    """

    queryset = (
        Album.objects.filter(published=True)
        .select_related("event")
        .prefetch_related("photos")
    )
    serializer_class = AlbumSerializer
    ordering = ["-event__date"]
