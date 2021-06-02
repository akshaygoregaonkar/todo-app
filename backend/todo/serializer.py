
from rest_framework import serializers
from django.contrib.auth.models import  User
from rest_framework.fields import SlugField

from rest_framework.validators import UniqueValidator
from .models import *


class UserSerializer(serializers.ModelSerializer):
    username=serializers.CharField(max_length=100)
    password=serializers.CharField(min_length=6)

    class Meta:
        model=User
        fields=[ 'id','username', 'password']
        # validators = [
        #     UniqueTogetherValidator(
        #         queryset=User.objects.all(),
        #         fields=['list', 'position']
        #     )
        # ]

        slug = SlugField(
            max_length=100,
            validators=[UniqueValidator(queryset=User.objects.all())]
        )

class TodoListserializers(serializers.ModelSerializer):
    class Meta:
        model=Todolist
        fields='__all__'


class Todoserializers(serializers.ModelSerializer):
    class Meta:
        model=Todolist
        fields=['task','description','date']




