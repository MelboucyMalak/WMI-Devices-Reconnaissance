

from django.urls import path

from . import views
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [

    path('login/', obtain_auth_token, name="login-user"), #fct predifinie
    path('logout/', views.logoutUser, name="logout-user"),   #rohi llviews.py
]