from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("events", "0003_eventphoto_updated_at_alter_event_created_at_and_more"),
    ]

    operations = [
        migrations.AddConstraint(
            model_name="eventphoto",
            constraint=models.UniqueConstraint(
                fields=("event", "order"),
                name="unique_event_photo_order",
            ),
        ),
    ]
