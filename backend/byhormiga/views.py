import boto3
from django.conf import settings
from django.http import Http404, HttpResponseRedirect, JsonResponse
from django.views.defaults import page_not_found


def api_not_found(request, exception):
    if not settings.DEBUG and request.path.startswith("/api/"):
        return JsonResponse({"detail": "Not found."}, status=404)

    return page_not_found(request, exception)


def media_proxy_redirect(request, key):
    if not settings.MEDIA_PROXY_ENABLED or not settings.AWS_STORAGE_BUCKET_NAME:
        raise Http404("Media proxy is not enabled.")

    s3_client = boto3.client(
        "s3",
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME or None,
        endpoint_url=settings.AWS_S3_ENDPOINT_URL or None,
    )
    presigned_url = s3_client.generate_presigned_url(
        "get_object",
        Params={"Bucket": settings.AWS_STORAGE_BUCKET_NAME, "Key": key},
        ExpiresIn=settings.AWS_PRESIGNED_URL_EXPIRATION,
    )
    return HttpResponseRedirect(presigned_url)
