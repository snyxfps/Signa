from rest_framework import serializers
from .models import Compatibility
from apps.signs.serializers import SignSerializer


class CompatibilitySerializer(serializers.ModelSerializer):
    sign_a = SignSerializer(read_only=True)
    sign_b = SignSerializer(read_only=True)

    class Meta:
        model  = Compatibility
        fields = [
            'id', 'sign_a', 'sign_b',
            'love_score', 'friendship_score', 'work_score', 'overall_score',
            'strengths', 'conflicts', 'advice', 'summary',
        ]
