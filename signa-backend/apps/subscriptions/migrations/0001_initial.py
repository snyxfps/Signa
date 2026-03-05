from django.db import migrations, models
import uuid
from django.conf import settings

class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('plan', models.CharField(choices=[('free', 'Free'), ('premium', 'Premium'), ('annual', 'Annual')], default='free', max_length=20)),
                ('status', models.CharField(choices=[('active', 'Active'), ('cancelled', 'Cancelled'), ('expired', 'Expired'), ('trialing', 'Trialing')], default='active', max_length=20)),
                ('stripe_customer_id', models.CharField(blank=True, max_length=60)),
                ('stripe_sub_id', models.CharField(blank=True, max_length=60)),
                ('current_period_start', models.DateTimeField(blank=True, null=True)),
                ('current_period_end', models.DateTimeField(blank=True, null=True)),
                ('cancelled_at', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=models.deletion.CASCADE, related_name='subscription', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'subscriptions',
            },
        ),
    ]
