# -*- coding:utf-8 -*-
from __future__ import unicode_literals
from django.db import models
import ast
from django.contrib import admin
import datetime
import django.utils.timezone
from datetime import datetime

class CompressedTextField(models.TextField):
    """
    model Fields for storing text in a compressed format (bz2 by default)
    """
 
    def from_db_value(self, value, expression, connection, context):
        if not value:
            return value
        try:
            return value.decode('base64').decode('bz2').decode('utf-8')
        except Exception:
            return value
 
    def to_python(self, value):
        if not value:
            return value
        try:
            return value.decode('base64').decode('bz2').decode('utf-8')
        except Exception:
            return value
 
    def get_prep_value(self, value):
        if not value:
            return value
        try:
            value.decode('base64')
            return value
        except Exception:
            try:
                return value.encode('utf-8').encode('bz2').encode('base64')
            except Exception:
                return value



 
class ListField(models.TextField):
    #__metaclass__ = models.SubfieldBase
    description = "Stores a python list"
 
    def __init__(self, *args, **kwargs):
        super(ListField, self).__init__(*args, **kwargs)
 
    def to_python(self, value):
        if not value:
            value = []
 
        if isinstance(value, list):
            return value
 
        return ast.literal_eval(value)
 
    def get_prep_value(self, value):
        if value is None:
            return value
 
        return unicode(value) # use str(value) in Python 3
 
    def value_to_string(self, obj):
        value = self._get_val_from_obj(obj)
        return self.get_db_prep_value(value)



##############################################################################
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _
class customUser(User):
    "inherit from User"

    totalActiveTime  = models.IntegerField(default=0)
#   id          = models.AutoField(primary_key=True)
#   name        = models.CharField(max_length=100)
#   pic         = models.FileField(default='')
#   description = models.CharField(max_length=400,default='')
#   password    = models.CharField(max_length=20)
#   email       = models.EmailField(default='hksac@139.com')
#   registerTime= models.DateField(default=django.utils.timezone.now)
#   lastlogin   = models.DateField(default=django.utils.timezone.now)

    class Meta:
        verbose_name = _('customUser')
        verbose_name_plural = _('customUsers')
        # abstract = False

#   def __unicode__(self):
#       return unicode(self.name)

    

# Create your models here.
class question(models.Model):
    #time         = models.DateTimeField(default=django.utils.timezone.now)
    id           = models.AutoField(primary_key=True)
    title        = models.CharField(max_length=200)
    tag          = models.CharField(max_length=100)
    content      = models.TextField()
    #time         = models.DateTimeField(default=datetime.now())
    time         = models.DateTimeField(default=django.utils.timezone.now)
    From         = models.ForeignKey('customUser')
    answerNumber = models.IntegerField(default=0)

    def __unicode__(self):
        return unicode(self.title)

    class Meta:
        ordering = ['-time']

# Create your models here.
class answer(models.Model):
    id          = models.AutoField(primary_key=True)
    questionid  = models.ForeignKey('question')
    content     = models.TextField()
    #time        = models.DateTimeField(default=django.utils.timezone.now)
    #time        =   models.DateTimeField(default=datetime.now())
    time        =   models.DateTimeField(default=django.utils.timezone.now)
    From        = models.ForeignKey('customUser')

    def __unicode__(self):
        return unicode(self.content)




admin.site.register(customUser)
admin.site.register(question)
admin.site.register(answer)