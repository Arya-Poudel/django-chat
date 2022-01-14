from django.db import models
from django.contrib.auth.models import User


class Message(models.Model):
	content = models.TextField()
	timestamp = models.DateTimeField(auto_now=True)
	sent_by = models.ForeignKey(User, on_delete=models.CASCADE)
	room = models.ForeignKey('Room', on_delete=models.CASCADE)

	def __str__(self):
		return self.content 



class Room(models.Model):
	name = models.CharField(max_length=255)