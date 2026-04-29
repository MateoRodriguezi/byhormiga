from django.urls import path

from .views import (
    EventFeaturedListAPIView,
    EventListAPIView,
    EventRetrieveAPIView,
    GalleryListAPIView,
)

urlpatterns = [
    path("", EventListAPIView.as_view(), name="event-list"),
    path("gallery/", GalleryListAPIView.as_view(), name="gallery-list"),
    path("featured/", EventFeaturedListAPIView.as_view(), name="event-featured"),
    path("<slug:slug>/", EventRetrieveAPIView.as_view(), name="event-detail"),
]
