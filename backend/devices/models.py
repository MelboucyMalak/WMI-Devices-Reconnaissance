from django.db import models
from django.utils import timezone


class TargetMachine(models.Model):
    """Represents a target machine being monitored"""
    hostname = models.CharField(max_length=255, unique=True)
    ip_address = models.GenericIPAddressField()
    port = models.IntegerField(default=4444)
    is_active = models.BooleanField(default=True)
    last_seen = models.DateTimeField(auto_now=True)
    os_info = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-last_seen']
    
    def __str__(self):
        return f"{self.hostname} ({self.ip_address})"
    
    @property
    def is_online(self):
        """Check if machine was seen in last 5 minutes"""
        if not self.last_seen:
            return False
        time_diff = timezone.now() - self.last_seen
        return time_diff.total_seconds() < 300  # 5 minutes


class Device(models.Model):
    """Represents a device/peripheral from WMI"""
    device_id = models.CharField(max_length=500)
    name = models.CharField(max_length=255)
    caption = models.CharField(max_length=255, blank=True, null=True)
    device_class = models.CharField(max_length=100, blank=True, null=True)
    manufacturer = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=50, blank=True, null=True)
    driver = models.CharField(max_length=255, blank=True, null=True)
    mac_address = models.CharField(max_length=50, blank=True, null=True)
    system_name = models.CharField(max_length=255, blank=True, null=True)
    
    # Link to target machine
    target_machine = models.ForeignKey(
        TargetMachine, 
        on_delete=models.CASCADE, 
        related_name='devices',
        null=True,
        blank=True
    )
    
    last_updated = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['name']
        unique_together = ['device_id', 'target_machine']
    
    def __str__(self):
        return f"{self.name} on {self.target_machine.hostname if self.target_machine else 'Unknown'}"

