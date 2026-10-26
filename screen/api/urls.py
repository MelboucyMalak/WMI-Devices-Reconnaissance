from . import views
from django.urls import path


urlpatterns = [
    path('start_session/', views.start, name='start-session'), #connects to the vm
    path('start_spying/', views.spy, name='start-spying'),
    path('stop_spying/', views.stop, name='stop-spying'),

]