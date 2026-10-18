
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes



User = get_user_model()

@api_view(['POST'])
@permission_classes([IsAuthenticated])    #only people who are authenticated can use this view 
def logoutUser(request):
    request.user.auth_token.delete()
    return Response({"detail" : "Successfully logged out"})