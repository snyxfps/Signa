from django.db import migrations, models

class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ('signs', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Compatibility',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('love_score', models.SmallIntegerField()),
                ('friendship_score', models.SmallIntegerField()),
                ('work_score', models.SmallIntegerField()),
                ('overall_score', models.SmallIntegerField()),
                ('strengths', models.TextField(blank=True)),
                ('conflicts', models.TextField(blank=True)),
                ('advice', models.TextField(blank=True)),
                ('summary', models.TextField(blank=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('sign_a', models.ForeignKey(on_delete=models.deletion.CASCADE, related_name='compat_as_a', to='signs.sign')),
                ('sign_b', models.ForeignKey(on_delete=models.deletion.CASCADE, related_name='compat_as_b', to='signs.sign')),
            ],
            options={
                'db_table': 'compatibility',
                'unique_together': {('sign_a', 'sign_b')},
                'verbose_name_plural': 'compatibilities',
            },
        ),
    ]
