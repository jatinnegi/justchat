import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Message, Chat, Contact
from django.contrib.auth import get_user_model
from .views import get_last_10_messages
from rest_framework.authtoken.models import Token

User = get_user_model()


class ChatConsumer(WebsocketConsumer):

    def fetch_messages(self, data):
        chat_id = self.room_name
        messages = self.messages_to_json(get_last_10_messages(chat_id))

        content = {
            'command': 'fetch_messages',
            'messages': messages,
        }

        self.send_message(content)

    def new_message(self, data):
        key = data['from']
        token = Token.objects.get(key=key)
        content = data['message']

        contact = Contact.objects.get(user=token.user)
        chat = Chat.objects.get(id=self.room_name)

        message = Message.objects.create(contact=contact, content=content)
        message.save()

        chat.messages.add(message)
        chat.save()

        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }

        return self.send_chat_message(content)

    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))

        return result

    def message_to_json(self, message):
        return {
            'id': message.id,
            'author': message.contact.user.username,
            'content': message.content,
            'timestamp': str(message.timestamp)
        }

    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message,
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_layer
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_chat_message(self, message):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    def send_message(self, messages):
        self.send(text_data=json.dumps(messages))

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))
