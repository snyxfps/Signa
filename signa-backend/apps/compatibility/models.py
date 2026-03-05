from django.db import models
from apps.signs.models import Sign


class Compatibility(models.Model):
    sign_a           = models.ForeignKey(Sign, on_delete=models.CASCADE, related_name='compat_as_a')
    sign_b           = models.ForeignKey(Sign, on_delete=models.CASCADE, related_name='compat_as_b')
    love_score       = models.SmallIntegerField()
    friendship_score = models.SmallIntegerField()
    work_score       = models.SmallIntegerField()
    overall_score    = models.SmallIntegerField()
    strengths        = models.TextField(blank=True)
    conflicts        = models.TextField(blank=True)
    advice           = models.TextField(blank=True)
    summary          = models.TextField(blank=True)
    created_at       = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table         = 'compatibility'
        unique_together  = [('sign_a', 'sign_b')]
        verbose_name_plural = 'compatibilities'

    def __str__(self):
        return f"{self.sign_a.name} + {self.sign_b.name} ({self.overall_score})"
