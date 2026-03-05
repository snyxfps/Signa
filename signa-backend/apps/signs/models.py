from django.db import models


class Sign(models.Model):
    ELEMENTS   = [('fire','Fire'),('earth','Earth'),('air','Air'),('water','Water')]
    MODALITIES = [('cardinal','Cardinal'),('fixed','Fixed'),('mutable','Mutable')]

    slug          = models.SlugField(max_length=20, unique=True)
    name          = models.CharField(max_length=30)
    symbol        = models.CharField(max_length=5)
    element       = models.CharField(max_length=10, choices=ELEMENTS)
    modality      = models.CharField(max_length=10, choices=MODALITIES)
    ruling_planet = models.CharField(max_length=30)
    date_start    = models.CharField(max_length=6)   # 'Mar 21'
    date_end      = models.CharField(max_length=6)   # 'Apr 19'
    image_url     = models.URLField(blank=True)
    created_at    = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'signs'
        ordering = ['id']

    def __str__(self):
        return self.name


class SignContent(models.Model):
    sign             = models.OneToOneField(Sign, on_delete=models.CASCADE, related_name='content')
    language         = models.CharField(max_length=5, default='en')
    overview         = models.TextField(blank=True)
    personality      = models.TextField(blank=True)
    strengths        = models.JSONField(default=list)
    weaknesses       = models.JSONField(default=list)
    love_style       = models.TextField(blank=True)
    work_style       = models.TextField(blank=True)
    friendship_style = models.TextField(blank=True)
    famous_people    = models.JSONField(default=list)
    seo_title        = models.CharField(max_length=160, blank=True)
    seo_description  = models.CharField(max_length=320, blank=True)
    updated_at       = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'sign_content'

    def __str__(self):
        return f"{self.sign.name} content"
