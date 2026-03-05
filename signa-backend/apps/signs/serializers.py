from rest_framework import serializers
from .models import Sign, SignContent


class SignContentSerializer(serializers.ModelSerializer):
    class Meta:
        model  = SignContent
        fields = [
            'overview', 'personality', 'strengths', 'weaknesses',
            'love_style', 'work_style', 'friendship_style',
            'famous_people', 'seo_title', 'seo_description',
        ]


class SignSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Sign
        fields = [
            'id', 'slug', 'name', 'symbol', 'element', 'modality',
            'ruling_planet', 'date_start', 'date_end', 'image_url',
        ]


class SignDetailSerializer(serializers.ModelSerializer):
    content = SignContentSerializer(read_only=True)

    class Meta:
        model  = Sign
        fields = [
            'id', 'slug', 'name', 'symbol', 'element', 'modality',
            'ruling_planet', 'date_start', 'date_end', 'image_url',
            'content',
        ]
