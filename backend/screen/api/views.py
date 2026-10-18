
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, BasePermission


permission_classes([IsAuthenticated])   #lzm ykon authenticated
@api_view(['POST'])
def start(request):
    
    return Response({"message": "Session started successfully."})


permission_classes([IsAuthenticated])
@api_view(['POST'])
def spy(request):
    
    return Response({"message": "screen displayed successfully."})


permission_classes([IsAuthenticated])
@api_view(['POST'])
def stop(request):
    return Response({"message": "stopped successfully."})

