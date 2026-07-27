from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0004_remove_unused_event_fields'),
    ]

    operations = [
        migrations.RunSQL(
            sql="""
                ALTER TABLE events_event ALTER COLUMN price_info DROP NOT NULL;
                ALTER TABLE events_event ALTER COLUMN price_info DROP DEFAULT;
                ALTER TABLE events_event ALTER COLUMN price_info TYPE integer USING NULLIF(price_info, '')::integer;
            """,
            reverse_sql="""
                ALTER TABLE events_event ALTER COLUMN price_info TYPE varchar(200) USING COALESCE(price_info::varchar, '');
                ALTER TABLE events_event ALTER COLUMN price_info SET NOT NULL;
                ALTER TABLE events_event ALTER COLUMN price_info SET DEFAULT '';
            """,
            state_operations=[
                migrations.AlterField(
                    model_name='event',
                    name='price_info',
                    field=models.PositiveIntegerField(
                        blank=True,
                        null=True,
                        verbose_name='Precio',
                        help_text='Precio de la entrada en pesos uruguayos, solo el número (ej: 500). Se muestra en el sitio como $U 500. Dejar vacío si no aplica.',
                    ),
                ),
            ],
        ),
    ]
