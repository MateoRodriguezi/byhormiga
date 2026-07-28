from urllib.parse import quote

from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.http import JsonResponse
from django.utils import timezone
from django.utils.text import get_valid_filename


SPANISH_MONTH_ABBR = {
    1: "ENE",
    2: "FEB",
    3: "MAR",
    4: "ABR",
    5: "MAY",
    6: "JUN",
    7: "JUL",
    8: "AGO",
    9: "SEP",
    10: "OCT",
    11: "NOV",
    12: "DIC",
}


def format_spanish_date(date_value):
    date_value = timezone.localtime(date_value)
    return (
        f"{date_value.day:02d} {SPANISH_MONTH_ABBR[date_value.month]} {date_value.year}"
    )


def format_spanish_month_year(date_value):
    date_value = timezone.localtime(date_value)
    return f"{SPANISH_MONTH_ABBR[date_value.month]} {date_value.year}"


def build_media_proxy_url(request, file_name):
    if not file_name:
        return None

    if settings.MEDIA_PROXY_ENABLED:
        return request.build_absolute_uri(f"/media/{quote(file_name, safe='/')}")

    return request.build_absolute_uri(default_storage.url(file_name))


def handle_admin_rich_text_image_upload(request, folder):
    """Guarda una imagen subida desde el editor de texto enriquecido del admin
    y devuelve su URL, para usar en las vistas `upload-image/` de cada admin."""
    if request.method != "POST":
        return JsonResponse({"detail": "Method not allowed"}, status=405)

    image = request.FILES.get("image")
    if not image:
        return JsonResponse({"detail": "No image provided"}, status=400)

    filename = get_valid_filename(image.name)
    storage_path = default_storage.save(
        f"{folder}/{filename}", ContentFile(image.read())
    )
    return JsonResponse({"url": build_media_proxy_url(request, storage_path)})
