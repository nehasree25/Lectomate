from django.db import models
from mongoengine import Document, StringField
from mongoengine import DateTimeField
from datetime import datetime
# Create your models here.
class User(Document):
    name = StringField(required=True)
    email = StringField(required=True,unique=True)
    password = StringField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)