from django.urls import path
from . import views

urlpatterns = [
    
    path('home', views.RoomView.as_view()),
    path('create-room', views.CreateRoomView.as_view()),
    path('get-room', views.GetRoom.as_view())
]