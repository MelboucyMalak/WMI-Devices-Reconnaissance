from django.contrib import admin
from django.contrib.admindocs import views
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('', include('homepage.urls')),
    path('devices/', include('devices.api.urls')),
    path('screen/', include('screen.api.urls')),
]
