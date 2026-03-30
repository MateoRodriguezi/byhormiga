from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Partner
from .serializers import PartnerSerializer


class PartnerViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet para Partners (solo lectura desde el frontend)
    Retorna solo partners activos, ordenados por el campo 'order'
    """
    serializer_class = PartnerSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['active']
    ordering_fields = ['order', 'name']
    ordering = ['order', 'name']

    def get_queryset(self):
        """Retorna solo partners activos por defecto"""
        return Partner.objects.filter(active=True)
