from django.urls import path
from .views import SignListView, SignDetailView

urlpatterns = [
    path('',        SignListView.as_view(),   name='sign-list'),
    path('<slug:slug>/', SignDetailView.as_view(), name='sign-detail'),
]
