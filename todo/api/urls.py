from django.urls import path
from .views import getTasks, updateTask, Register, OTPVerification
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .serializers import MyTokenObtainPairView

urlpatterns = [
    path('tasks/', view=getTasks),
    path('tasks/<str:pk>', view=updateTask),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('Register/', view=Register),
    path("verifyOTP/", view=OTPVerification)
]
