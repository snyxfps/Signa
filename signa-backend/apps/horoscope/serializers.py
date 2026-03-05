from rest_framework import serializers
from .models import DailyHoroscope
from apps.signs.serializers import SignSerializer


class HoroscopeSerializer(serializers.ModelSerializer):
    sign = SignSerializer(read_only=True)

    class Meta:
        model  = DailyHoroscope
        fields = [
            'id', 'sign', 'date', 'period', 'content',
            'love_score', 'work_score', 'health_score',
            'lucky_number', 'lucky_color',
        ]
