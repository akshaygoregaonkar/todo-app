from django.shortcuts import render

# Create your views here.
from .serializer import UserSerializer, Todoserializers,TodoListserializers
from rest_framework import status
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Todolist


@api_view(["POST"])
def sign_up(request):
    if  User.objects.filter(username=request.data['username'] ):
        return Response(data={"username":["user is already Exist"]}, status=400)
    else:
        req_data=UserSerializer(data=request.data)
        if req_data.is_valid():
            username = request.data['username']
            password = request.data['password']

            user = User.objects.create(username=username)
            user.set_password(password)
            user.save()
            token, _ = Token.objects.get_or_create(user_id=user.id)
            token.save()
            return Response(data={"id":user.id,"username":user.username,"token": token.key},status=201)
        else:
            return  Response(status=status.HTTP_400_BAD_REQUEST,data=req_data.errors)

@api_view(["POST"])
def sign_in(request):
    username = request.data['username']
    password = request.data['password']
    # verify
    user = User.objects.get(username=username)
    if user:
        if user.check_password(password):
            # now create token
            token, _ = Token.objects.get_or_create(user_id=user.id)
            token.save()
            return Response(data={"username":user.username,"token": token.key})
        return Response(data={"message": "incorrect password"}, status=401)
    else:
        return Response(data={"message":"User does not Exist"})

@api_view(['GET','POST'])
@authentication_classes([TokenAuthentication,SessionAuthentication])
@permission_classes([IsAuthenticated])
def create_retrive_todo(request):
    if request.method=='GET':
        list=Todolist.objects.all()
        response_list=TodoListserializers(list,many=True)
        return Response(data=response_list.data)
    elif request.method=='POST':
        print(request.data)
        req_data=Todoserializers(data=request.data)
        if req_data.is_valid():
            print("saved")
            req_data.save()
            created_todo = Todolist.objects.last()
            response_todo = TodoListserializers(created_todo)
            return Response(data=response_todo.data)

        else:
            Response(status=status.HTTP_400_BAD_REQUEST,data=req_data.errors)


@api_view(['GET','PUT','DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def Update_delete_Get_Todo(request,Id):
    if request.method=="PUT":
        req_data=request.data
        todo_checked=Todolist.objects.get(id=Id)
        todo_checked.checked=req_data['checked']
        todo_checked.save()

        return Response(status=200)



    elif request.method=="DELETE":
        if Todolist.objects.get(id=Id):
            todo= Todolist.objects.get(id=Id)
            todo.delete()
            return Response(status=200)


