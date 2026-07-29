import uuid

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('about', '0002_seed_initial_content'),
    ]

    operations = [
        migrations.CreateModel(
            name='StoryBlockImage',
            fields=[
                ('id', models.CharField(default=uuid.uuid4, editable=False, max_length=64, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('updated_at', models.DateTimeField(auto_now=True, db_index=True)),
                ('image', models.ImageField(upload_to='about/story/', verbose_name='Foto')),
                ('order', models.PositiveIntegerField(default=0, help_text='Orden de rotación (menor número = primero)', verbose_name='Orden')),
                ('story_block', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='about.storyblock', verbose_name='Bloque')),
            ],
            options={
                'verbose_name': 'Foto de bloque',
                'verbose_name_plural': 'Fotos de bloque',
                'ordering': ['order'],
            },
        ),
    ]
