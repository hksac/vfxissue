"""
WSGI config for vfxissue project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "vfxissue.settings")

application = get_wsgi_application()

#In server evironment, your should tell wsgi application what settings file to use.
#the sentence below is used for this usage.
#os.environ['DJANGO_SETTINGS_MODULE'] = 'mysite.settings'