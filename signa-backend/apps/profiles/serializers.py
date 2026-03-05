from rest_framework import serializers
from .models import Profile
from apps.signs.models import Sign
from .astro_engine import BirthData, compute_astro_profile

class ProfileSerializer(serializers.ModelSerializer):
    sun_sign = serializers.SlugRelatedField(slug_field='slug', queryset=Sign.objects.all(), allow_null=True, required=False)
    moon_sign = serializers.SlugRelatedField(slug_field='slug', queryset=Sign.objects.all(), allow_null=True, required=False)
    rising_sign = serializers.SlugRelatedField(slug_field='slug', queryset=Sign.objects.all(), allow_null=True, required=False)

    class Meta:
        model = Profile
        fields = [
            'birth_date','birth_time','birth_city','country','latitude','longitude',
            'sun_sign','moon_sign','rising_sign','avatar_url','bio','is_public'
        ]

    def update(self, instance, validated_data):
        # apply user edits
        for k, v in validated_data.items():
            setattr(instance, k, v)

        # recompute signs when birth data changes
        bd = BirthData(
            birth_date=instance.birth_date,
            birth_time=instance.birth_time,
            latitude=float(instance.latitude) if instance.latitude is not None else None,
            longitude=float(instance.longitude) if instance.longitude is not None else None,
        )
        astro = compute_astro_profile(bd)
        # always set sun; moon/rising may be None
        instance.sun_sign = Sign.objects.filter(slug=astro['sun_sign']).first()
        if astro.get('moon_sign'):
            instance.moon_sign = Sign.objects.filter(slug=astro['moon_sign']).first()
        if astro.get('rising_sign'):
            instance.rising_sign = Sign.objects.filter(slug=astro['rising_sign']).first()

        instance.save()
        return instance
