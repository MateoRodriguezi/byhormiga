import logging

from django.conf import settings
from django.core.mail import EmailMessage

logger = logging.getLogger(__name__)


def send_contact_notification(contact_message):
    """Notifica por mail que llegó un mensaje de contacto nuevo.
    No rompe el guardado del mensaje si falla (queda logueado nomás)."""
    if not settings.EMAIL_HOST_USER or not settings.EMAIL_HOST_PASSWORD:
        return

    body = (
        f"Nombre: {contact_message.name}\n"
        f"Email: {contact_message.email}\n"
        f"Asunto: {contact_message.subject}\n\n"
        f"Mensaje:\n{contact_message.message}"
    )

    email = EmailMessage(
        subject=f"Nuevo mensaje de contacto: {contact_message.subject}",
        body=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[settings.CONTACT_NOTIFICATION_EMAIL],
        reply_to=[contact_message.email],
    )
    try:
        email.send(fail_silently=False)
    except Exception:
        logger.exception("No se pudo enviar el mail de notificación de contacto")
