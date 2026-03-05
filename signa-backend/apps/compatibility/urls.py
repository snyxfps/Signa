from django.urls import path
from .views import CompatibilityView

urlpatterns = [
    path('', CompatibilityView.as_view(), name='compatibility'),
]
