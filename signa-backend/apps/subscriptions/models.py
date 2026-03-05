import uuid
from django.db import models
from django.conf import settings


class Subscription(models.Model):
    PLAN_CHOICES   = [('free','Free'),('premium','Premium'),('annual','Annual')]
    STATUS_CHOICES = [('active','Active'),('cancelled','Cancelled'),('expired','Expired'),('trialing','Trialing')]

    id                   = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user                 = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='subscription')
    plan                 = models.CharField(max_length=20, choices=PLAN_CHOICES, default='free')
    status               = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    stripe_customer_id   = models.CharField(max_length=60, blank=True)
    stripe_sub_id        = models.CharField(max_length=60, blank=True)
    current_period_start = models.DateTimeField(null=True, blank=True)
    current_period_end   = models.DateTimeField(null=True, blank=True)
    cancelled_at         = models.DateTimeField(null=True, blank=True)
    created_at           = models.DateTimeField(auto_now_add=True)
    updated_at           = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'subscriptions'

    def __str__(self):
        return f"{self.user.email} – {self.plan}"

    @property
    def is_active_premium(self):
        return self.status == 'active' and self.plan in ('premium', 'annual')
