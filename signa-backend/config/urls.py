from django.urls import path, include
from django.contrib import admin

urlpatterns = [
    path('api/v1/auth/',          include('apps.users.urls')),
    path('api/v1/profile/',       include('apps.profiles.urls')),
    path('api/v1/signs/',         include('apps.signs.urls')),
    path('api/v1/horoscope/',     include('apps.horoscope.urls')),
    path('api/v1/compatibility/', include('apps.compatibility.urls')),
    path('admin/',                admin.site.urls),
]
