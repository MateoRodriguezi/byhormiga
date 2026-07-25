from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0003_event_recap_video'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='active_since',
        ),
        migrations.RemoveField(
            model_name='event',
            name='average_attendance',
        ),
        migrations.RemoveField(
            model_name='event',
            name='category',
        ),
        migrations.RemoveField(
            model_name='event',
            name='frequency',
        ),
        migrations.RemoveField(
            model_name='event',
            name='logo',
        ),
        migrations.RemoveField(
            model_name='event',
            name='long_description',
        ),
    ]
