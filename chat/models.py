from django.db import models
from django.contrib.auth import get_user_model

import pprint

User = get_user_model()


class Contact(models.Model):
    user = models.ForeignKey(
        User, related_name='friends', on_delete=models.CASCADE)
    friends = models.ManyToManyField('self', blank=True)

    def __str__(self):
        return self.user.username

    @property
    def username(self):
        return self.user.username

    @property
    def profile_image(self):
        profile_image = f"http://localhost:8000/static-images/{self.user.profile_image.name}"
        return profile_image


class Message(models.Model):
    contact = models.ForeignKey(
        Contact, related_name='messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.contact.user.username


class Chat(models.Model):
    participants = models.ManyToManyField(Contact, related_name='chats')
    messages = models.ManyToManyField(Message, blank=True)

    def __str__(self):
        return "{}".format(self.pk)

    @property
    def participants_list(self):
        participants = self.participants.all()
        participants_list = []

        for participant in participants:
            user = {
                'username': participant.user.username,
                'profile_image': f"http://localhost:8000/static-images/{participant.user.profile_image.name}"
            }

            participants_list.append(user)

        return participants_list

    @property
    def preview(self):
        try:
            message = self.messages.all().order_by('-timestamp')[0]
            username = message.contact.user.username
            content = message.content

            preview = {
                'username': username,
                'content': content,
            }

            return preview

        except IndexError:
            return {}
