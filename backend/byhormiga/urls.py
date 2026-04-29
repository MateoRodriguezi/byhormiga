"""
URL configuration for byhormiga project.
"""

from django.contrib import admin
from django.conf import settings
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

api_v1_url_patterns = [
    path("events/", include("events.urls")),
    path("posts/", include("blog.urls")),
    path("contact/", include("contact.urls")),
    path("partners/", include("partners.urls")),
]

if settings.DEBUG:
    api_v1_url_patterns += [
        path("schema/", SpectacularAPIView.as_view(), name="schema"),
        path(
            "docs/",
            SpectacularSwaggerView.as_view(url_name="schema"),
            name="swagger-ui",
        ),
    ]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(api_v1_url_patterns)),
]
