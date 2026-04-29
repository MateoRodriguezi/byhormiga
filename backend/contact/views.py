from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import ContactMessageSerializer


class ContactMessageCreateAPIView(generics.CreateAPIView):
    """
    API endpoint para mensajes de contacto.
    - Create: POST /api/contact/
    """

    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]

    def create(self, request):
        """Crea un nuevo mensaje de contacto"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"success": True, "message": "Mensaje enviado correctamente"},
            status=status.HTTP_201_CREATED,
        )
