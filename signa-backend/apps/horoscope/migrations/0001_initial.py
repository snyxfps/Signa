from django.db import migrations, models

class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ('signs', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DailyHoroscope',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('period', models.CharField(choices=[('daily', 'Daily'), ('weekly', 'Weekly'), ('monthly', 'Monthly')], default='daily', max_length=10)),
                ('content', models.TextField()),
                ('love_score', models.SmallIntegerField(blank=True, null=True)),
                ('work_score', models.SmallIntegerField(blank=True, null=True)),
                ('health_score', models.SmallIntegerField(blank=True, null=True)),
                ('lucky_number', models.SmallIntegerField(blank=True, null=True)),
                ('lucky_color', models.CharField(blank=True, max_length=30)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('sign', models.ForeignKey(on_delete=models.deletion.CASCADE, related_name='horoscopes', to='signs.sign')),
            ],
            options={
                'db_table': 'daily_horoscope',
                'unique_together': {('sign', 'date', 'period')},
            },
        ),
        migrations.AddIndex(
            model_name='dailyhoroscope',
            index=models.Index(fields=['sign', 'date', 'period'], name='idx_horoscope_sign_date'),
        ),
    ]
