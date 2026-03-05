from django.db import migrations, models
import uuid
from django.conf import settings

class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ('users', '0001_initial'),
        ('signs', '0001_initial'),
        ('subscriptions', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('birth_date', models.DateField()),
                ('birth_time', models.TimeField(blank=True, null=True)),
                ('birth_city', models.CharField(blank=True, max_length=120)),
                ('country', models.CharField(blank=True, max_length=60)),
                ('latitude', models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True)),
                ('longitude', models.DecimalField(blank=True, decimal_places=6, max_digits=9, null=True)),
                ('avatar_url', models.URLField(blank=True)),
                ('bio', models.TextField(blank=True)),
                ('is_public', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('moon_sign', models.ForeignKey(blank=True, null=True, on_delete=models.deletion.SET_NULL, related_name='moon_profiles', to='signs.sign')),
                ('rising_sign', models.ForeignKey(blank=True, null=True, on_delete=models.deletion.SET_NULL, related_name='rising_profiles', to='signs.sign')),
                ('sun_sign', models.ForeignKey(blank=True, null=True, on_delete=models.deletion.SET_NULL, related_name='sun_profiles', to='signs.sign')),
                ('user', models.OneToOneField(on_delete=models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'profiles',
            },
        ),
    ]
