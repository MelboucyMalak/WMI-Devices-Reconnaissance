# from django.shortcuts import render

# from devices.wmi_scripts import get_devices



# def showdevices(request):

#     devices=get_devices() #call imene's function
# from django.http import JsonResponse
# from .wmi_scripts import get_devices

# def showdevices(request):
#     devices = get_devices()
#     return JsonResponse({"status": "success", "devices": devices})
#     context={
#         'devices': devices
#     }

#     return render(request, 'devices/devices.html', context)


# def device_detail(request, device_id):
    

#     return render(request, 'devices/device_detail.html', {'device_id': device_id})

