from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
import jwt
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
from datetime import datetime, timedelta

# Create your views here.
class RegisterAPI(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data

            # 🔐 HASH PASSWORD HERE
            data["password"] = make_password(data["password"])

            User(**data).save()

            return Response(
                {"message": "User registered"}
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginAPI(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = User.objects(email=email).first()

        if not user or not check_password(password, user.password):
            raise AuthenticationFailed("Invalid credentials")

        # 🔑 TOKEN IS CREATED HERE
        payload = {
            "user_id": str(user.id),
            "email": user.email,
            "exp": datetime.utcnow() + timedelta(minutes=15),
            "iat": datetime.utcnow(),
        }

        token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

        # 🔑 TOKEN IS RETURNED HERE
        return Response({
            "access_token": token
        })
