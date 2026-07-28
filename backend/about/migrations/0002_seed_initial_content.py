import os

from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.db import migrations

SEED_DATA_DIR = os.path.join(os.path.dirname(__file__), "seed_data")

STORY_BLOCKS = [
    {
        "title": "",
        "text": (
            "Somos una <strong>productora de eventos y entretenimiento en Uruguay</strong>, "
            "enfocada en crear propuestas de alta convocatoria que integran producción, "
            "contenido y ejecución profesional. Lo que comenzó como un pequeño proyecto hoy "
            "se convirtió en un referente del entretenimiento, desarrollando formatos "
            "innovadores para distintos públicos, con "
            "<strong>impacto, recordación y conexión emocional</strong>."
        ),
        "image_file": "story-1.jpg",
        "order": 0,
    },
    {
        "title": "Nuestro crecimiento",
        "text": (
            "Al año producimos un promedio de más de <strong>200 eventos</strong>, trabajamos "
            "junto a más de <strong>150 artistas</strong> nacionales e internacionales y "
            "convocamos a más de <strong>200.000 personas</strong>. Además, somos una de las "
            "empresas con mayor volumen de eventos para menores de 18 años en Uruguay, con un "
            "conocimiento profundo de las particularidades operativas, legales y logísticas "
            "que este tipo de producciones requiere."
        ),
        "image_file": "story-2.jpg",
        "order": 1,
    },
    {
        "title": "Nuestra forma de hacer",
        "text": (
            "Nuestra filosofía es simple: cada evento es una oportunidad para crear algo "
            "extraordinario. Por eso, <strong>combinamos creatividad, tecnología y "
            "pasión</strong> para diseñar propuestas memorables, capaces de superar las "
            "expectativas de cada cliente."
        ),
        "image_file": "story-3.jpg",
        "order": 2,
    },
]

STATS = [
    {
        "value": "+200",
        "label": "eventos anuales",
        "description": "Producimos más de 200 eventos al año en distintos puntos de Uruguay.",
        "order": 0,
    },
    {
        "value": "+150",
        "label": "artistas anuales",
        "description": (
            "Trabajamos junto a más de 150 artistas nacionales e internacionales, "
            "provenientes de Puerto Rico, Colombia, Estados Unidos y otros países."
        ),
        "order": 1,
    },
    {
        "value": "+200.000",
        "label": "tickets anuales",
        "description": "Más de 200.000 personas forman parte de nuestras experiencias cada año.",
        "order": 2,
    },
]


def seed_initial_content(apps, schema_editor):
    AboutPage = apps.get_model("about", "AboutPage")
    StoryBlock = apps.get_model("about", "StoryBlock")
    Stat = apps.get_model("about", "Stat")

    if not AboutPage.objects.exists():
        AboutPage.objects.create(pk="about-page", hero_title="¿Quiénes somos?")

    if not StoryBlock.objects.exists():
        for block in STORY_BLOCKS:
            image_path = os.path.join(SEED_DATA_DIR, block["image_file"])
            with open(image_path, "rb") as image_file:
                storage_path = default_storage.save(
                    f"about/story/{block['image_file']}",
                    ContentFile(image_file.read()),
                )
            StoryBlock.objects.create(
                title=block["title"],
                text=block["text"],
                image=storage_path,
                order=block["order"],
            )

    if not Stat.objects.exists():
        for stat in STATS:
            Stat.objects.create(
                value=stat["value"],
                label=stat["label"],
                description=stat["description"],
                is_number=True,
                order=stat["order"],
            )


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("about", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_initial_content, noop_reverse),
    ]
