from django.urls import path

from .views import ProductionListAPIView, ProductionRetrieveAPIView

urlpatterns = [
    path("", ProductionListAPIView.as_view(), name="production-list"),
    path("<slug:slug>/", ProductionRetrieveAPIView.as_view(), name="production-detail"),
]
