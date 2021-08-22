from django.urls import path
from .views import (
    ChatListView,
    ChatDetailView,
    chat_create_view,
    ChatUpdateView,
    ChatDeleteView,
    ContactListView
)

app_name = 'chat'

urlpatterns = [
    path('', ChatListView.as_view()),
    path('contacts/', ContactListView.as_view()),
    path('create/<str:pk>/', chat_create_view),
    path('<pk>/', ChatDetailView.as_view()),
    path('<pk>/update/', ChatUpdateView.as_view()),
    path('<pk>/delete/', ChatDeleteView.as_view()),
]
