from django.db import models
from apps.signs.models import Sign


class DailyHoroscope(models.Model):
    PERIOD_CHOICES = [
        ('daily',   'Daily'),
        ('weekly',  'Weekly'),
        ('monthly', 'Monthly'),
    ]

    sign         = models.ForeignKey(Sign, on_delete=models.CASCADE, related_name='horoscopes')
    date         = models.DateField()
    period       = models.CharField(max_length=10, choices=PERIOD_CHOICES, default='daily')
    content      = models.TextField()
    love_score   = models.SmallIntegerField(null=True, blank=True)
    work_score   = models.SmallIntegerField(null=True, blank=True)
    health_score = models.SmallIntegerField(null=True, blank=True)
    lucky_number = models.SmallIntegerField(null=True, blank=True)
    lucky_color  = models.CharField(max_length=30, blank=True)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table        = 'daily_horoscope'
        unique_together = [('sign', 'date', 'period')]
        indexes         = [
            models.Index(fields=['sign', 'date', 'period'], name='idx_horoscope_sign_date'),
        ]

    def __str__(self):
        return f"{self.sign.name} – {self.period} – {self.date}"
