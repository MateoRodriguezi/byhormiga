from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('about', '0004_move_image_to_storyblockimage'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='storyblock',
            name='image',
        ),
    ]
