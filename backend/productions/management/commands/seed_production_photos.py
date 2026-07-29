import json
import os

from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.core.management.base import BaseCommand

from productions.models import Production, ProductionSectionImage, ProductionVenue

MANIFEST_PATH = os.path.join(
    os.path.dirname(__file__), "..", "..", "migrations", "seed_data", "photo_manifest.json"
)


class Command(BaseCommand):
    help = (
        "Sube las fotos reales de las producciones (logo, hero, secciones, venues, cierre) "
        "desde un directorio con una copia de public/brands y public/logos del frontend."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "source_dir",
            help="Carpeta que contiene los subdirectorios 'brands/' y 'logos/' (copia de public/ del frontend)",
        )

    def handle(self, *args, **options):
        source_dir = options["source_dir"]

        with open(MANIFEST_PATH, encoding="utf-8") as f:
            manifest = json.load(f)

        uploaded = 0
        skipped = 0

        for entry in manifest:
            try:
                production = Production.objects.get(slug=entry["slug"])
            except Production.DoesNotExist:
                self.stdout.write(self.style.WARNING(f"Producción no encontrada: {entry['slug']}"))
                continue

            if entry.get("logo") and not production.logo:
                path, ok = self._upload(source_dir, entry["logo"], "productions/logos")
                if ok:
                    production.logo = path
                    uploaded += 1
                else:
                    skipped += 1

            if entry.get("hero_image") and not production.hero_image:
                path, ok = self._upload(source_dir, entry["hero_image"], "productions/hero")
                if ok:
                    production.hero_image = path
                    uploaded += 1
                else:
                    skipped += 1

            if entry.get("closing_image") and not production.closing_image:
                path, ok = self._upload(source_dir, entry["closing_image"], "productions/closing")
                if ok:
                    production.closing_image = path
                    uploaded += 1
                else:
                    skipped += 1

            production.save()

            sections = list(production.sections.order_by("order"))
            for section, section_entry in zip(sections, entry.get("sections", [])):
                if section.images.exists():
                    continue
                for order, image_path in enumerate(section_entry.get("images", [])):
                    path, ok = self._upload(source_dir, image_path, "productions/sections")
                    if ok:
                        ProductionSectionImage.objects.create(
                            section=section, image=path, order=order
                        )
                        uploaded += 1
                    else:
                        skipped += 1

            venues = list(production.venues.order_by("order"))
            for venue, venue_entry in zip(venues, entry.get("venues", [])):
                if venue_entry.get("image") and not venue.image:
                    path, ok = self._upload(
                        source_dir, venue_entry["image"], "productions/venues"
                    )
                    if ok:
                        venue.image = path
                        venue.save()
                        uploaded += 1
                    else:
                        skipped += 1

        self.stdout.write(self.style.SUCCESS(f"Listo. Subidas: {uploaded}, saltadas: {skipped}"))

    def _upload(self, source_dir, relative_path, storage_folder):
        """relative_path viene como '/brands/wonder/hero.jpg' o '/logos/logos_Wonder.png'"""
        local_path = os.path.join(source_dir, relative_path.lstrip("/"))
        if not os.path.isfile(local_path):
            self.stdout.write(self.style.WARNING(f"No existe: {local_path}"))
            return None, False

        filename = os.path.basename(local_path)
        with open(local_path, "rb") as f:
            storage_path = default_storage.save(
                f"{storage_folder}/{filename}", ContentFile(f.read())
            )
        return storage_path, True
