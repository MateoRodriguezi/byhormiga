from django.urls import path

from .views import AboutContentAPIView

urlpatterns = [
    path("", AboutContentAPIView.as_view(), name="about-content"),
]
