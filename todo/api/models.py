from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField


class User(AbstractUser):
    name = models.CharField(max_length=200, null=True)
    mobileNo = PhoneNumberField(unique=True, null=True, blank=True)
    otp = models.IntegerField(null=True, blank=True)

    USERNAME_FIELD = 'mobileNo'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.name


class Task(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    task = models.CharField(max_length=200, null=False)
    Description = models.TextField(default="", null=True, blank=True)
    checked = models.BooleanField(default=False)
    reminder = models.IntegerField(default=0)

    def __str__(self):
        return self.task
