from rest_framework import generics
from rest_framework.permissions import AllowAny
from django.core.cache import cache
from .models import Sign
from .serializers import SignSerializer, SignDetailSerializer


class SignListView(generics.ListAPIView):
    """GET /api/v1/signs/"""
    queryset           = Sign.objects.prefetch_related('content').all()
    serializer_class   = SignSerializer
    permission_classes = [AllowAny]

    def list(self, request, *args, **kwargs):
        cached = cache.get('signs:all')
        if cached:
            from rest_framework.response import Response
            return Response(cached)
        response = super().list(request, *args, **kwargs)
        cache.set('signs:all', response.data, timeout=3600)
        return response


class SignDetailView(generics.RetrieveAPIView):
    """GET /api/v1/signs/{slug}/"""
    queryset           = Sign.objects.prefetch_related('content').all()
    serializer_class   = SignDetailSerializer
    lookup_field       = 'slug'
    permission_classes = [AllowAny]
