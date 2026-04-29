"""
URL configuration for byhormiga project.
"""

from django.contrib import admin
from django.conf import settings
from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from events.views import (
    EventFeaturedListAPIView,
    EventListAPIView,
    EventRetrieveAPIView,
    GalleryListAPIView,
)
from blog.views import PostListAPIView, PostRetrieveAPIView
from contact.views import ContactMessageCreateAPIView
from partners.views import PartnerListAPIView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/events/", EventListAPIView.as_view(), name="event-list"),
    path(
        "api/events/featured/",
        EventFeaturedListAPIView.as_view(),
        name="event-featured",
    ),
    path(
        "api/events/<slug:slug>/", EventRetrieveAPIView.as_view(), name="event-detail"
    ),
    path("api/posts/", PostListAPIView.as_view(), name="post-list"),
    path("api/posts/<slug:slug>/", PostRetrieveAPIView.as_view(), name="post-detail"),
    path("api/gallery/", GalleryListAPIView.as_view(), name="gallery-list"),
    path("api/contact/", ContactMessageCreateAPIView.as_view(), name="contact-create"),
    path("api/partners/", PartnerListAPIView.as_view(), name="partner-list"),
]

if settings.DEBUG:
    urlpatterns += [
        path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
        path(
            "api/docs/",
            SpectacularSwaggerView.as_view(url_name="schema"),
            name="swagger-ui",
        ),
    ]
