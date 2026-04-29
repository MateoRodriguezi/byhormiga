from rest_framework import filters, generics
from django_filters.rest_framework import DjangoFilterBackend
from .models import Partner
from .serializers import PartnerSerializer


class PartnerListAPIView(generics.ListAPIView):
    """
    ViewSet para Partners (solo lectura desde el frontend)
    Retorna solo partners activos, ordenados por el campo 'order'
    """

    serializer_class = PartnerSerializer
    queryset = Partner.objects.filter(active=True)
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["active"]
    ordering_fields = ["order", "name"]
    ordering = ["order", "name"]
