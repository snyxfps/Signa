from django.db import migrations, models

class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Sign',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField(max_length=20, unique=True)),
                ('name', models.CharField(max_length=30)),
                ('symbol', models.CharField(max_length=5)),
                ('element', models.CharField(choices=[('fire', 'Fire'), ('earth', 'Earth'), ('air', 'Air'), ('water', 'Water')], max_length=10)),
                ('modality', models.CharField(choices=[('cardinal', 'Cardinal'), ('fixed', 'Fixed'), ('mutable', 'Mutable')], max_length=10)),
                ('ruling_planet', models.CharField(max_length=30)),
                ('date_start', models.CharField(max_length=6)),
                ('date_end', models.CharField(max_length=6)),
                ('image_url', models.URLField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'signs',
                'ordering': ['id'],
            },
        ),
        migrations.CreateModel(
            name='SignContent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language', models.CharField(default='en', max_length=5)),
                ('overview', models.TextField(blank=True)),
                ('personality', models.TextField(blank=True)),
                ('strengths', models.JSONField(default=list)),
                ('weaknesses', models.JSONField(default=list)),
                ('love_style', models.TextField(blank=True)),
                ('work_style', models.TextField(blank=True)),
                ('friendship_style', models.TextField(blank=True)),
                ('famous_people', models.JSONField(default=list)),
                ('seo_title', models.CharField(blank=True, max_length=160)),
                ('seo_description', models.CharField(blank=True, max_length=320)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('sign', models.OneToOneField(on_delete=models.deletion.CASCADE, related_name='content', to='signs.sign')),
            ],
            options={
                'db_table': 'sign_content',
            },
        ),
    ]
