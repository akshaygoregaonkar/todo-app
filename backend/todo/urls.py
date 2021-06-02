from django.urls import path
from .views import *
urlpatterns = [
    path('signIn/',sign_in,name="signIn" ),
    path('signUp/',sign_up,name="signUp" ),
    path('todo/',create_retrive_todo,name="create_retrive_todo"),
    path('todo/<int:Id>/',Update_delete_Get_Todo,name="update_delete_todo")
]