# from django.core.checks import messages
# from django.shortcuts import redirect, render
# from django.contrib.auth import login,authenticate, logout 
# from django.contrib.auth.models import User

# # Create your views here.
# def loginUser(request):
#     page = 'login'    
#     if request.user.is_authenticated:
#         return redirect('devices')    #m3ntha ki nkon msjla deja wnsyi ndir /login mn9drch trj3ni llhomepage


#     if request.method == 'POST':
#         username = request.POST['username']  #get the data from the form
#         password = request.POST['password']

#         try:
#             user = User.objects.get(username=username)
#         except:
#             messages.error(request, 'Username does not exist')
#             return redirect('login-user')    #so the mesaage dissapears when i refresh

#         user = authenticate(request, username=username, password=password) #if valid returns a user object if not returns none

#         if user is not None:
#             return redirect('devices')
#         else:
#             messages.error(request, 'Username or Password is incorrect')
#             return redirect('login-user')      

#     return render(request, 'users/login.html')


# def logoutUser(request):
#     logout(request)
#     messages.success(request, 'User was successfully logged out')

#     return redirect('login-user')