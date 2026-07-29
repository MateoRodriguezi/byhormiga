from django.db import migrations


def move_images(apps, schema_editor):
    StoryBlock = apps.get_model("about", "StoryBlock")
    StoryBlockImage = apps.get_model("about", "StoryBlockImage")

    for block in StoryBlock.objects.all():
        if block.image:
            StoryBlockImage.objects.create(
                story_block=block, image=block.image, order=0
            )


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('about', '0003_create_storyblockimage'),
    ]

    operations = [
        migrations.RunPython(move_images, noop_reverse),
    ]
