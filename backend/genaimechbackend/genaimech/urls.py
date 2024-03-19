from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('genaimech/', views.getGenaimech, name="genaimech"),
    path("genaimech/chat/<str:pk>/", views.chat, name="chat"),
    path("genaimech/getallchats",
         views.getallchats, name="getallchats"),
    path("genaimech/newchat", views.newchat, name="newchat"),
    path("genaimech/getchat/<str:pk>",
         views.getchat, name="getchat"),
    path("genaimech/form/<str:diagnosis>/",
         views.postForm, name="postForm"),
]
