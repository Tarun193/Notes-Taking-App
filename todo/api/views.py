from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Task, User
from .serializers import TaskSerializer
from rest_framework.permissions import IsAuthenticated
import random
from sms.sendsms import sendMessage
from django.contrib.auth.hashers import make_password
from phonenumber_field.phonenumber import PhoneNumber


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def getTasks(request):
    if request.method == "GET":
        user = request.user
        tasks = user.task_set.all()
        task_serialized = TaskSerializer(tasks, many=True)
        taskJson = task_serialized.data
        return Response(taskJson)

    if request.method == "POST":
        user = request.user
        task = Task.objects.create(
            task=request.data['task'],
            user=request.user
        )
        task_serializer = TaskSerializer(instance=task, data=request.data)
        if task_serializer.is_valid():
            task_serializer.save()
            sendMessage("New Task has been added to your Notes: " +
                        task.task, user.mobileNo.as_e164)
            print("done")
            return Response(task_serializer.data, status=201)
        else:
            return Response(task_serializer.errors, status=400)


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def updateTask(request, pk):
    if request.method == "GET":
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(status=404)

        task_serialized = TaskSerializer(task, many=False)
        return Response(task_serialized.data)

    if request.method == "PUT":
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(status=404)

        task_serializer = TaskSerializer(task, data=request.data)
        if task_serializer.is_valid():
            task_serializer.save()
            return Response(task_serializer.data)
        else:
            return Response(task_serializer.errors, status=400)

    if request.method == "DELETE":
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(status=404)
        task.delete()
        return Response(status=200)


@api_view(["POST"])
def Register(request):
    # try:
    print(request.data)
    user = User.objects.create(
        name=request.data["name"],
        password=make_password(request.data["password"]),
        otp=random.randint(100000, 999999),
        mobileNo=PhoneNumber.from_string(request.data["number"])
    )
    user.is_active = False
    user.save()
    print(user)
    sendMessage("Your OTP is: " + str(user.otp), user.mobileNo.as_e164)
    return Response(status=200)
    # except:
    #     return Response(status=404)


@api_view(["POST"])
def OTPVerification(request):
    if request.method == "POST":
        number = request.data["number"]
        user = User.objects.get(mobileNo=PhoneNumber.from_string(number))

        if not user:
            return Response(status=404)
        else:
            if request.data["otp"].isdigit() and user.otp == int(request.data["otp"]):
                user.is_active = True
                user.save()
                sendMessage("You are successfully verified, now you can login",
                            user.mobileNo.as_e164)
                return Response(status=200)
            return Response(status=404)


#  Implementing task reminder is pending, use  Celery to schedule task that will run along with django
# and send remider to user accounding to their seclected preferences
