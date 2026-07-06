from django.core.management.base import BaseCommand

from events.models import Event


class Command(BaseCommand):
    help = "Borra eventos por titulo exacto, incluyendo sus fotos/video en el storage."

    def add_arguments(self, parser):
        parser.add_argument("titles", nargs="+", type=str, help="Titulos exactos de los eventos a borrar")

    def handle(self, *args, **options):
        for title in options["titles"]:
            try:
                event = Event.objects.get(title=title)
            except Event.DoesNotExist:
                self.stdout.write(self.style.WARNING(f"No existe: {title}"))
                continue

            for photo in event.photos.all():
                photo.image.delete(save=False)
            if event.recap_video:
                event.recap_video.delete(save=False)
            if event.poster:
                event.poster.delete(save=False)
            if event.logo:
                event.logo.delete(save=False)

            event.delete()
            self.stdout.write(self.style.SUCCESS(f"Borrado: {title}"))
