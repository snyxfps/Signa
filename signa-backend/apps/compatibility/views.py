from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.core.cache import cache
from apps.signs.models import Sign
from .models import Compatibility
from .serializers import CompatibilitySerializer


class CompatibilityView(APIView):
    """GET /api/v1/compatibility/?signA=aries&signB=leo"""
    permission_classes = [AllowAny]

    def get(self, request):
        sign_a_slug = request.query_params.get('signA', '').lower().strip()
        sign_b_slug = request.query_params.get('signB', '').lower().strip()

        if not sign_a_slug or not sign_b_slug:
            return Response(
                {'error': 'Both signA and signB query parameters are required.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if sign_a_slug == sign_b_slug:
            return Response({'error': 'Please select two different signs.'}, status=status.HTTP_400_BAD_REQUEST)

        # Normalise order for symmetric cache key
        cache_key = 'compat:' + ':'.join(sorted([sign_a_slug, sign_b_slug]))
        cached = cache.get(cache_key)
        if cached:
            return Response(cached)

        try:
            sign_a = Sign.objects.get(slug=sign_a_slug)
            sign_b = Sign.objects.get(slug=sign_b_slug)
            compat = (
                Compatibility.objects.filter(sign_a=sign_a, sign_b=sign_b).first()
                or Compatibility.objects.filter(sign_a=sign_b, sign_b=sign_a).first()
            )
        except Sign.DoesNotExist:
            compat = None
            
            # Create mock Sign objects just for the fallback text
            class MockSign:
                def __init__(self, slug):
                    names = {
                        "aries": "Áries", "taurus": "Touro", "gemini": "Gêmeos", 
                        "cancer": "Câncer", "leo": "Leão", "virgo": "Virgem", 
                        "libra": "Libra", "scorpio": "Escorpião", "sagittarius": "Sagitário", 
                        "capricorn": "Capricórnio", "aquarius": "Aquário", "pisces": "Peixes"
                    }
                    self.name = names.get(slug, slug.capitalize())
            
            sign_a = MockSign(sign_a_slug)
            sign_b = MockSign(sign_b_slug)

        if not compat:
            # Fallback mock data for testing UI since DB is empty
            import random
            data = {
                "overall_score": random.randint(60, 95),
                "love_score": random.randint(50, 95),
                "work_score": random.randint(50, 95),
                "friendship_score": random.randint(50, 95),
                "strengths": f"Both {sign_a.name} and {sign_b.name} share an incredible dynamic.",
                "conflicts": f"At times, {sign_a.name}'s approach may clash with {sign_b.name}'s ideas.",
                "advice": "Comunicação aberta e paciência são a chave para vocês dois!"
            }
            cache.set(cache_key, data, timeout=86400)
            return Response(data)

        data = CompatibilitySerializer(compat).data
        cache.set(cache_key, data, timeout=86400)  # 24h — static data
        return Response(data)
