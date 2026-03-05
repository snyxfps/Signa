from django.urls import path
from .views import TodayHoroscopeView, WeeklyHoroscopeView

urlpatterns = [
    path('today/', TodayHoroscopeView.as_view(), name='horoscope-today'),
    path('weekly/', WeeklyHoroscopeView.as_view(), name='horoscope-weekly'),
]
