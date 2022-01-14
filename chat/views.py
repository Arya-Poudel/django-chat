from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Message, Room   


@login_required
def index(request):
	return render(request, 'frontend/index.html')


@login_required
def room(request, room_name):
	room = Room.objects.filter(name=room_name).first()
	messages = []

	if room:
		messages = Message.objects.filter(room=room)
	else:
		room = Room(name=room_name)
		room.save()

	return render(request, 'frontend/room.html', {'room_name': room_name, 'messages' : messages})
