
from django.urls import path
from . import views

urlpatterns = [
    path('session/', views.start_session, name='start_session'),
]