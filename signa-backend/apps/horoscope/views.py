from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.core.cache import cache
from django.utils import timezone
from apps.signs.models import Sign
from .models import DailyHoroscope
from .serializers import HoroscopeSerializer


class TodayHoroscopeView(APIView):
    """
    GET /api/v1/horoscope/today/
    Authenticated: uses user's sun sign.
    Public: requires ?sign=slug query param.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        today = timezone.now().date()
        sign_slug = request.query_params.get('sign', '').lower()

        # Authenticated users get their sun sign automatically
        if request.user.is_authenticated and not sign_slug:
            try:
                sign_slug = request.user.profile.sun_sign.slug
            except Exception:
                return Response({'error': 'Complete your profile to get a personalized horoscope.'}, status=400)

        if not sign_slug:
            return Response({'error': 'Provide a ?sign= parameter or log in.'}, status=400)

        cache_key = f'horoscope:{sign_slug}:{today}:daily'
        cached = cache.get(cache_key)
        if cached:
            return Response(cached)

        try:
            horoscope = DailyHoroscope.objects.select_related('sign').get(
                sign__slug=sign_slug, date=today, period='daily'
            )
        except DailyHoroscope.DoesNotExist:
            return Response({'error': f'No horoscope available for {sign_slug} today.'}, status=404)

        data = HoroscopeSerializer(horoscope).data
        cache.set(cache_key, data, timeout=86400)
        return Response(data)


class WeeklyHoroscopeView(APIView):
    """GET /api/v1/horoscope/weekly/?sign=aries"""
    permission_classes = [AllowAny]

    def get(self, request):
        sign_slug = request.query_params.get('sign', '').lower()
        if not sign_slug:
            return Response({'error': '?sign= is required.'}, status=400)

        today = timezone.now().date()
        horoscopes = DailyHoroscope.objects.filter(
            sign__slug=sign_slug, period='daily'
        ).order_by('-date')[:7]

        return Response(HoroscopeSerializer(horoscopes, many=True).data)
