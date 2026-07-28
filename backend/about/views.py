from rest_framework.response import Response
from rest_framework.views import APIView
from .models import AboutPage, Stat, StoryBlock
from .serializers import AboutContentSerializer


class AboutContentAPIView(APIView):
    """
    API endpoint con el contenido editable de la página Nosotros.
    - GET /api/about/
    """

    def get(self, request):
        data = {
            "hero_title": AboutPage.load().hero_title,
            "story_blocks": StoryBlock.objects.all(),
            "stats": Stat.objects.all(),
        }
        serializer = AboutContentSerializer(data, context={"request": request})
        return Response(serializer.data)
