import logging

import requests
from django.conf import settings
from django.utils.html import escape

logger = logging.getLogger(__name__)


def send_contact_notification(contact_message):
    """Notifica por mail que llegó un mensaje de contacto nuevo.
    No rompe el guardado del mensaje si falla (queda logueado nomás)."""
    if not settings.RESEND_API_KEY:
        return

    body = (
        f"<p><strong>Nombre:</strong> {escape(contact_message.name)}</p>"
        f"<p><strong>Email:</strong> {escape(contact_message.email)}</p>"
        f"<p><strong>Asunto:</strong> {escape(contact_message.subject)}</p>"
        f"<p><strong>Mensaje:</strong></p>"
        f"<p>{escape(contact_message.message).replace(chr(10), '<br>')}</p>"
    )

    try:
        response = requests.post(
            "https://api.resend.com/emails",
            headers={"Authorization": f"Bearer {settings.RESEND_API_KEY}"},
            json={
                "from": settings.CONTACT_FROM_EMAIL,
                "to": [settings.CONTACT_NOTIFICATION_EMAIL],
                "reply_to": contact_message.email,
                "subject": f"Nuevo mensaje de contacto: {contact_message.subject}",
                "html": body,
            },
            timeout=10,
        )
        response.raise_for_status()
    except requests.RequestException:
        logger.exception("No se pudo enviar el mail de notificación de contacto")
