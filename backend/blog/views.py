from rest_framework import filters, generics
from django_filters.rest_framework import DjangoFilterBackend
from .models import Post
from .serializers import PostSerializer


class PostListAPIView(generics.ListAPIView):
    """
    API endpoint para listado de artículos de blog.
    - List: GET /api/posts/
    """

    queryset = Post.objects.filter(status="published")
    serializer_class = PostSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = ["published_at"]
    ordering = ["-published_at"]


class PostRetrieveAPIView(generics.RetrieveAPIView):
    """
    API endpoint para detalle de artículo de blog.
    - Detail: GET /api/posts/{slug}/
    """

    queryset = Post.objects.filter(status="published")
    serializer_class = PostSerializer
    lookup_field = "slug"
