from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Profile
from .serializers import ProfileSerializer

class MyProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, _ = Profile.objects.get_or_create(
            user=request.user,
            defaults={
                'birth_date': '2000-01-01',
                'birth_city': '',
                'country': '',
            }
        )
        return Response(ProfileSerializer(profile).data)

    def put(self, request):
        profile, _ = Profile.objects.get_or_create(
            user=request.user,
            defaults={
                'birth_date': '2000-01-01',
                'birth_city': '',
                'country': '',
            }
        )
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
