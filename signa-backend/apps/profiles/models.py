import uuid
from django.db import models
from django.conf import settings
from apps.signs.models import Sign


class Profile(models.Model):
    id             = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user           = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    birth_date     = models.DateField()
    birth_time     = models.TimeField(null=True, blank=True)
    birth_city     = models.CharField(max_length=120, blank=True)
    country        = models.CharField(max_length=60, blank=True)
    latitude       = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude      = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    sun_sign       = models.ForeignKey(Sign, null=True, blank=True, on_delete=models.SET_NULL, related_name='sun_profiles')
    moon_sign      = models.ForeignKey(Sign, null=True, blank=True, on_delete=models.SET_NULL, related_name='moon_profiles')
    rising_sign    = models.ForeignKey(Sign, null=True, blank=True, on_delete=models.SET_NULL, related_name='rising_profiles')
    avatar_url     = models.URLField(blank=True)
    bio            = models.TextField(blank=True)
    is_public      = models.BooleanField(default=False)
    created_at     = models.DateTimeField(auto_now_add=True)
    updated_at     = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'profiles'

    def __str__(self):
        return f"{self.user.full_name}'s profile"

    @property
    def is_premium(self) -> bool:
        try:
            return self.user.subscription.plan in ('premium', 'annual') \
                   and self.user.subscription.status == 'active'
        except Exception:
            return False
