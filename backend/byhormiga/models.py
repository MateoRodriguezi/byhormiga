import uuid

from django.db import models


class TimeStampMixin(models.Model):
    """Time stamp mixin for models."""

    id = models.CharField(
        primary_key=True, editable=False, default=uuid.uuid4, max_length=64
    )  # noqa: A003
    created_at = models.DateTimeField(auto_now_add=True, editable=False, db_index=True)
    updated_at = models.DateTimeField(auto_now=True, editable=False, db_index=True)

    class Meta:
        """Meta class for TimeStampMixin."""

        abstract = True
        ordering = ["-created_at"]
