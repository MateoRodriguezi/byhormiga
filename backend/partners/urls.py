from django.urls import path
from .views import PartnerListAPIView

urlpatterns = [
    path("", PartnerListAPIView.as_view(), name="partner-list"),
]
