# Generated by Django 3.2.4 on 2023-03-05 18:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20230305_1308'),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('task', models.CharField(max_length=200)),
                ('task_description', models.TextField(blank=True, null=True)),
                ('checked', models.BooleanField(default=False)),
                ('reminder', models.IntegerField(default=0)),
            ],
        ),
    ]