"""vfxissue URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url,include,patterns
from django.contrib import admin
from question.views import home
from question.views import ajax_answer
from question.views import ajax_recent
from question.views import ajax_question
from question.views import ajax_addanswer
from question.views import ajax_addquestion
from question.user_views import user_register
from question.user_views import user_login
from question.user_views import user_logout
from question.views import ajax_search
from question.views import ajax_policy
from question.views import ajax_hotuser
from question.views import ajax_hotquestion
# from question.views import ajax_logout
#import users.urls

urlpatterns = [
    url(r'^$'                                 , home ),
    url(r'^index.html'                        , home ),
    url(r'^ajax_recent/$'                     , ajax_recent ),
    url(r'^ajax_recent/(\w+)$'                , ajax_recent ),
    url(r'^ajax_recent/(\w+)/(\d+)$'          , ajax_recent ),
    url(r'^ajax_hotuser/'                     , ajax_hotuser ),
    url(r'^ajax_hotquestion/'                 , ajax_hotquestion ),
    url(r'^q/(\d+)$'                          , ajax_question ),
    url(r'^q/(\d+)/$'                         , ajax_question ),
    url(r'^a/(\d+)$'                          , ajax_answer    , name='answer' ),
    url(r'^a/(\d+)/$'                         , ajax_answer    , name='answer' ),
    url(r'^addquestion/$'                     , ajax_addquestion ),
    url(r'^(\d+)/addanswer/$'                 , ajax_addanswer ),
    url(r'^login/'                            , user_login ),
    url(r'^logout/'                           , user_logout ),
    url(r'^register/'                         , user_register ),
    url(r'^admin/'                            , admin.site.urls ),
    url(r'^search/([\s\S]+)/'                 , ajax_search ),
    url(r'^policy/'                           , ajax_policy ),
    #url(r'^login/'                            , ajax_login ),
    #url(r'^logout/'                           , ajax_logout ),
    #url(r'^accounts/'                         , include('users.urls')),
]