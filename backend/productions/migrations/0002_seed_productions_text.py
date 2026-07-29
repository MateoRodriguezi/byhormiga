import json
import os

from django.db import migrations

SEED_FILE = os.path.join(os.path.dirname(__file__), "seed_data", "productions.json")


def seed_productions(apps, schema_editor):
    Production = apps.get_model("productions", "Production")
    ProductionSection = apps.get_model("productions", "ProductionSection")
    ProductionVenue = apps.get_model("productions", "ProductionVenue")

    if Production.objects.exists():
        return

    with open(SEED_FILE, encoding="utf-8") as f:
        productions = json.load(f)

    for order, entry in enumerate(productions):
        production = Production.objects.create(
            name=entry["name"],
            slug=entry["slug"],
            category=entry["category"],
            card_description=entry["card_description"],
            destacado=entry["destacado"],
            venues_intro=entry["venues_intro"],
            closing_text=entry["closing_text"],
            order=order,
        )

        for section_order, section in enumerate(entry["sections"]):
            ProductionSection.objects.create(
                production=production,
                side=section["side"],
                text=section["text"],
                label=section["label"],
                order=section_order,
            )

        for venue_order, venue in enumerate(entry["venues"]):
            ProductionVenue.objects.create(
                production=production,
                name=venue["name"],
                order=venue_order,
            )


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("productions", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_productions, noop_reverse),
    ]
