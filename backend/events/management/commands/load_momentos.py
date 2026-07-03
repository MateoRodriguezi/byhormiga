from pathlib import Path

from django.core.files import File
from django.core.management.base import BaseCommand, CommandError
from django.utils import timezone
from django.utils.dateparse import parse_datetime

from events.models import Event, EventPhoto, Venue


def parse_local_datetime(value: str):
    return timezone.make_aware(parse_datetime(value))

ARTIST_CAPTIONS = {
    "internacionales": {
        "artistas_darell.jpg": "Darell",
        "artistas_de la ghetto.jpg": "De La Ghetto",
        "artistas_fmk.jpg": "FMK",
        "artistas_guayana.jpg": "Guayana",
        "artistas_jere klein.jpg": "Jere Klein",
        "artistas_kevinroldan.jpg": "Kevin Roldan",
        "artistas_la joaqui.jpg": "La Joaqui",
        "artistas_lauty gram.jpg": "Lauty Gram",
        "artistas_lgante.jpg": "L-Gante",
        "artistas_lukra.jpg": "Luck Ra",
    },
    "nacionales": {
        "artistas_la nueva escuela.jpg": "La Nueva Escuela",
        "artistas_luana.jpg": "Luana",
        "artistas_marama.jpg": "Marama",
        "artistas_the la planta.jpg": "The La Planta",
        "artistas_zeballos.jpg": "Zeballos",
    },
}

IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png"}


def find_dir(parent: Path, name: str) -> Path:
    """Busca una subcarpeta por nombre normalizado (ignora espacios/mayusculas)."""
    target = name.strip().lower()
    for child in parent.iterdir():
        if child.is_dir() and child.name.strip().lower() == target:
            return child
    return parent / name


def find_file(parent: Path, name: str) -> Path:
    target = name.strip().lower()
    for child in parent.iterdir():
        if child.is_file() and child.name.strip().lower() == target:
            return child
    return parent / name


class Command(BaseCommand):
    help = (
        "Carga los albumes de 'Momentos' (Antel Arena, Floripa, Artistas, "
        "Hit The Beach, Oversize El Jaguel) desde una carpeta descargada del Drive."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "base_path", type=str, help="Carpeta base con las subcarpetas del Drive"
        )
        parser.add_argument(
            "--force",
            action="store_true",
            help="Recarga fotos/video aunque el evento ya tenga contenido",
        )

    def handle(self, *args, **options):
        base = Path(options["base_path"]).expanduser()
        if not base.exists():
            raise CommandError(f"No existe la carpeta: {base}")
        force = options["force"]

        antel_arena, _ = Venue.objects.get_or_create(
            name="Antel Arena",
            defaults={"city": "Montevideo", "address": "Bulevar Batlle y Ordóñez, Montevideo"},
        )
        floripa_venue, _ = Venue.objects.get_or_create(
            name="Floripa",
            defaults={"city": "Florianópolis, Brasil", "address": "Florianópolis, Brasil"},
        )
        byhormiga_venue, _ = Venue.objects.get_or_create(
            name="ByHormiga",
            defaults={"city": "Montevideo", "address": "Montevideo, Uruguay"},
        )
        el_jaguel, _ = Venue.objects.get_or_create(
            name="El Jaguel",
            defaults={"city": "Punta del Este", "address": "El Jaguel, Punta del Este"},
        )
        hit_the_beach_venue, _ = Venue.objects.get_or_create(
            name="Hit The Beach",
            defaults={"city": "Punta del Este", "address": "Punta del Este, Uruguay"},
        )

        antel_arena_dir = find_dir(base, "Antel Arena")
        artistas_dir = find_dir(base, "Artistas")

        events_spec = [
            {
                "title": "Polenta en Antel Arena",
                "venue": antel_arena,
                "date": "2025-09-06 22:00:00",
                "description": "Recap fotografico y en video de Polenta en Antel Arena.",
                "photos_dir": find_dir(antel_arena_dir, "Polenta"),
                "video": find_file(find_dir(antel_arena_dir, "Polenta"), "POLENTA H.mp4"),
            },
            {
                "title": "Mega Wonder en Antel Arena - 2025",
                "venue": antel_arena,
                "date": "2025-08-16 22:00:00",
                "description": "Recap fotografico de Mega Wonder en Antel Arena, edicion 2025.",
                "photos_dir": find_dir(antel_arena_dir, "Wonder"),
                "video": None,
            },
            {
                "title": "Oversize en Antel Arena - 2025 / 2024",
                "venue": antel_arena,
                "date": "2025-03-01 22:00:00",
                "description": (
                    "Recap fotografico y en video del Oversize en Antel Arena, "
                    "ediciones 2025 y 2024."
                ),
                "photos_dir": find_dir(antel_arena_dir, "Oversize"),
                "video": find_file(
                    find_dir(antel_arena_dir, "Oversize"), "Oversize_AntelArena_Final.mp4"
                ),
            },
            {
                "title": "Floripa",
                "venue": floripa_venue,
                "date": "2026-01-15 12:00:00",
                "description": (
                    "4 años consecutivos formando parte de Floripa, "
                    "el Festival de Planet 01."
                ),
                "photos_dir": find_dir(base, "Floripa"),
                "video": find_file(find_dir(base, "Floripa"), "Floripa.mp4"),
            },
            {
                "title": "Artistas Internacionales",
                "venue": byhormiga_venue,
                "date": "2025-12-01 20:00:00",
                "description": (
                    "Momentos con artistas internacionales que pasaron por nuestros "
                    "escenarios: De la Ghetto, Darell, Guayana, Kevin Roldan, Jere Klein, "
                    "Lauty Gram, Luck Ra, La Joaqui, L-Gante y FMK."
                ),
                "photos_dir": find_dir(artistas_dir, "Internacionales"),
                "video": None,
                "caption_map": ARTIST_CAPTIONS["internacionales"],
            },
            {
                "title": "Artistas Nacionales",
                "venue": byhormiga_venue,
                "date": "2025-12-01 20:00:00",
                "description": (
                    "Momentos con artistas nacionales que pasaron por nuestros "
                    "escenarios: Marama, Luana, The La Planta, La Nueva Escuela y Zeballos."
                ),
                "photos_dir": find_dir(artistas_dir, "Nacionales"),
                "video": None,
                "caption_map": ARTIST_CAPTIONS["nacionales"],
            },
            {
                "title": "Hit The Beach",
                "venue": hit_the_beach_venue,
                "date": "2026-01-20 18:00:00",
                "description": "Recap fotografico de Hit The Beach.",
                "photos_dir": find_dir(base, "hit the beach"),
                "video": None,
            },
            {
                "title": "Oversize - El Jaguel, Punta Del Este",
                "venue": el_jaguel,
                "date": "2026-02-08 18:00:00",
                "description": "Recap fotografico de Oversize en El Jaguel, Punta del Este.",
                "photos_dir": find_dir(base, "Oversize Carpa PDE"),
                "video": None,
            },
        ]

        for spec in events_spec:
            self.load_event(spec, force)

    def load_event(self, spec, force):
        event, created = Event.objects.get_or_create(
            title=spec["title"],
            defaults={
                "venue": spec["venue"],
                "date": parse_local_datetime(spec["date"]),
                "description": spec["description"],
                "status": "published",
            },
        )
        if not created:
            event.venue = spec["venue"]
            event.date = parse_local_datetime(spec["date"])
            event.description = spec["description"]
            event.status = "published"
            event.save()

        self.stdout.write(f"Evento: {event.title} ({'creado' if created else 'actualizado'})")

        existing_photo_count = event.photos.count()
        if existing_photo_count and not force:
            self.stdout.write(
                f"  -> ya tiene {existing_photo_count} fotos, se omite (usa --force para recargar)"
            )
        else:
            if force:
                event.photos.all().delete()
            photos_dir = spec["photos_dir"]
            if not photos_dir.exists():
                self.stdout.write(self.style.WARNING(f"  -> carpeta no encontrada: {photos_dir}"))
            else:
                caption_map = spec.get("caption_map", {})
                files = sorted(
                    f
                    for f in photos_dir.iterdir()
                    if f.is_file() and f.suffix.lower() in IMAGE_SUFFIXES
                )
                for index, file_path in enumerate(files):
                    caption = caption_map.get(file_path.name.strip().lower(), "")
                    with open(file_path, "rb") as fh:
                        photo = EventPhoto(event=event, caption=caption, order=index)
                        photo.image.save(file_path.name, File(fh), save=True)
                self.stdout.write(f"  -> {len(files)} fotos cargadas")

        video_path = spec.get("video")
        if video_path:
            if not force and event.recap_video:
                self.stdout.write("  -> ya tiene video recap, se omite")
            elif not video_path.exists():
                self.stdout.write(self.style.WARNING(f"  -> video no encontrado: {video_path}"))
            else:
                with open(video_path, "rb") as fh:
                    event.recap_video.save(video_path.name, File(fh), save=True)
                self.stdout.write("  -> video recap cargado")
