from celery import shared_task
from django.utils import timezone
import logging

logger = logging.getLogger(__name__)


@shared_task(name='apps.horoscope.tasks.generate_daily_horoscopes')
def generate_daily_horoscopes():
    """Runs daily at 00:05 UTC via Celery Beat."""
    from apps.signs.models import Sign
    from .models import DailyHoroscope
    from .generator import generate_horoscope_content

    today = timezone.now().date()
    signs = Sign.objects.all()
    created = 0

    for sign in signs:
        _, was_created = DailyHoroscope.objects.get_or_create(
            sign=sign, date=today, period='daily',
            defaults=generate_horoscope_content(sign, today),
        )
        if was_created:
            created += 1

    logger.info(f'[SIGNA] Generated {created} horoscopes for {today}')
    return created
