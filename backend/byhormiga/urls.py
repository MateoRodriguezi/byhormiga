"""
URL configuration for byhormiga project.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from events.views import EventViewSet
from gallery.views import AlbumViewSet
from blog.views import PostViewSet
from contact.views import ContactMessageViewSet
from partners.views import PartnerViewSet

# Router para la API
router = DefaultRouter()
router.register(r'events', EventViewSet, basename='event')
router.register(r'gallery', AlbumViewSet, basename='album')
router.register(r'posts', PostViewSet, basename='post')
router.register(r'contact', ContactMessageViewSet, basename='contact')
router.register(r'partners', PartnerViewSet, basename='partner')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
