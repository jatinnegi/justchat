from rest_framework import serializers
from chat.models import Chat, Contact


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', 'participants_list', 'messages', 'preview', )


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('id', 'username', 'profile_image', )
