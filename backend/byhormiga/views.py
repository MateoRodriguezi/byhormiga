from django.conf import settings
from django.http import JsonResponse
from django.views.defaults import page_not_found


def api_not_found(request, exception):
    if not settings.DEBUG and request.path.startswith("/api/"):
        return JsonResponse({"detail": "Not found."}, status=404)

    return page_not_found(request, exception)
