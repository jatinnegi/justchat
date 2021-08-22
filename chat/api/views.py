from rest_framework import permissions
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    # CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)
from chat.models import Chat, Contact
from .serializers import ChatSerializer, ContactSerializer
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.db.models import Q
from django.http import JsonResponse
from rest_framework.authtoken.models import Token

User = get_user_model()


def get_user_contact(username):
    user = get_object_or_404(User, username=username)
    contact = get_object_or_404(Contact, user=user)

    return contact


class ContactListView(ListAPIView):
    serializer_class = ContactSerializer
    permission_classes = (permissions.AllowAny, )

    def get_queryset(self):
        current_user = self.request.user
        contacts_list = Contact.objects.all().filter(~Q(user=current_user))

        return contacts_list


class ChatListView(ListAPIView):
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        username = self.request.user.username

        if username is None:
            return []

        try:
            contact = get_user_contact(username)
            queryset = contact.chats.all()

            return queryset

        except:
            contact = Contact.objects.create(user=self.request.user)
            contact.save()

            return []


class ChatDetailView(RetrieveAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny,)


def chat_create_view(request, pk):
    token = request.META['HTTP_AUTHORIZATION'].split(' ')[1]
    current_contact = Contact.objects.get(
        user=Token.objects.get(key=token).user)
    chat_contact = Contact.objects.get(pk=pk)

    chat_list = current_contact.chats.all()
    chat = None

    for user_chat in chat_list:
        for participant in user_chat.participants.all():
            if participant == chat_contact:
                chat = user_chat
                break

    if chat:
        return JsonResponse({
            'id': chat.pk,
            'participants_list': chat.participants_list,
        }, safe=False)

    else:
        chat = Chat.objects.create()
        chat.participants.add(current_contact)
        chat.participants.add(chat_contact)
        chat.save()

        return JsonResponse({
            'id': chat.pk,
            'participants_list': chat.participants_list,
        }, safe=False)


class ChatUpdateView(UpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny,)


class ChatDeleteView(DestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny,)
