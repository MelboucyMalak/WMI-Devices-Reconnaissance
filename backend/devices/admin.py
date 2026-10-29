from django.contrib import admin
from .models import TargetMachine, Device


@admin.register(TargetMachine)
class TargetMachineAdmin(admin.ModelAdmin):
    list_display = ['hostname', 'ip_address', 'is_active', 'is_online', 'last_seen']
    list_filter = ['is_active', 'last_seen']
    search_fields = ['hostname', 'ip_address']
    readonly_fields = ['last_seen', 'created_at']


@admin.register(Device)
class DeviceAdmin(admin.ModelAdmin):
    list_display = ['name', 'device_class', 'status', 'manufacturer', 'target_machine', 'last_updated']
    list_filter = ['device_class', 'status', 'target_machine']
    search_fields = ['name', 'device_id', 'manufacturer']
    readonly_fields = ['last_updated', 'created_at']

