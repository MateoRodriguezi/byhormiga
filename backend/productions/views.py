from rest_framework import generics
from .models import Production
from .serializers import ProductionDetailSerializer, ProductionListSerializer


class ProductionListAPIView(generics.ListAPIView):
    """
    API endpoint para el listado liviano de producciones.
    - List: GET /api/productions/
    """

    queryset = Production.objects.all()
    serializer_class = ProductionListSerializer


class ProductionRetrieveAPIView(generics.RetrieveAPIView):
    """
    API endpoint para el detalle completo de una producción.
    - Detail: GET /api/productions/{slug}/
    """

    queryset = Production.objects.prefetch_related(
        "sections__images", "venues"
    )
    serializer_class = ProductionDetailSerializer
    lookup_field = "slug"
