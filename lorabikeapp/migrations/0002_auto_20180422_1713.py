# Generated by Django 2.0.4 on 2018-04-22 09:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lorabikeapp', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='location',
            old_name='fram_count',
            new_name='frame_count',
        ),
    ]
