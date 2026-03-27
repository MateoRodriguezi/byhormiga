from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Post
from .serializers import PostSerializer


class PostViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint para artículos de blog.
    - List: GET /api/posts/
    - Detail: GET /api/posts/{slug}/
    """
    queryset = Post.objects.filter(status='published')
    serializer_class = PostSerializer
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = ['published_at']
    ordering = ['-published_at']
