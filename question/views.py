# -*- coding:utf-8 -*-

from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render,render_to_response
from django.core.context_processors import csrf
from question.models import question
from question.models import answer
from question.models import customUser
from question.forms import questionForm
from question.forms import answerForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.template import RequestContext
from user_views import *
import datetime,random
import django.utils.timezone

# Create your views here.

def index(request):
    return HttpResponse(u'main question page.')




# This part is used to sync new column in table.
def syncTableForNewColumn():
    #sync totalActiveTime of customUser.
    userList                 = customUser.objects.all()
    for user in userList:
        questionList         = user.question_set.all()
        questionNumber       = len(questionList)
        answerList           = user.answer_set.all()
        answerNumber         = len(answerList)
        user.totalActiveTime = questionNumber + answerNumber
        user.save()
    #sync answerNumber of question.
    newQuestionList              = question.objects.all()
    for questionItem in newQuestionList:
        answerList            = questionItem.answer_set.all()
        answernumber          = len(answerList)
        questionItem.answerNumber = answernumber
        if questionItem.time == None:
            #questionItem.time = datetime.datetime.now()
            questionItem.time = django.utils.timezone.now()
        questionItem.save()
# This part is used to sync new column in table.




@deprecate_current_app
@sensitive_post_parameters()
@csrf_protect
@never_cache
def home(request):
    "Just return a framework."
    # syncTableForNewColumn()
    # print request.user,request.COOKIES
    # print 'Anonymous? ' + str(request.user.is_anonymous())
    print 'Authenticated? ' + str(request.user.is_authenticated())
    _authenticated_user_ = request.user.__unicode__()
    dictionary = {'user':_authenticated_user_}
    dictionary.update(csrf(request))
    #questions = question.objects.all()
    return render_to_response( 'question/home.html' , dictionary )




@deprecate_current_app
@sensitive_post_parameters()
@csrf_protect
@never_cache
def ajax_recent(request,requestType,pageIndex=1):
    "Just return a framework."
    print requestType,pageIndex
    pageIndex = int(pageIndex)
    if request.is_ajax():
        if requestType == 'all':
            questions = question.objects.all()[(pageIndex-1)*12:pageIndex*12]
        else:
            questions = question.objects.filter(tag__contains=requestType)[(pageIndex-1)*12:pageIndex*12]

        questionJson = []

        for q in questions:
            temp = {}
            temp['id']              = q.id
            temp['title']           = q.title
            temp['tag']             = q.tag
            temp['content']         = q.content
            try:
                temp['time']            = q.time.strftime("%Y-%m-%d %H:%M")
            except:
                temp['time']            = q.time
            temp['From']            = unicode(q.From)
            answers = answer.objects.filter(questionid=q.id)
            temp['answernumber']    = len(answers)
            questionJson.append(temp)

        # return JsonResponse(questionJson, safe=False)
        response = JsonResponse({'_question':questionJson})
        if not request.COOKIES.get("_username"):
            #dt = datetime.datetime.now() + datetime.timedelta(hours = int(1))
            dt = django.utils.timezone.now() + datetime.timedelta(hours = int(1))
            response.set_cookie('_username','Anonymous',expires=dt)

        response.set_cookie('_pagetype',requestType) 
        response.set_cookie('_currentpage',pageIndex) 

        return response
    else:
        return HttpResponseRedirect('/')




@deprecate_current_app
@sensitive_post_parameters()
@csrf_protect
@never_cache
def ajax_hotuser(request):
    if request.is_ajax():
        users       = customUser.objects.order_by('-totalActiveTime')[0:10]
        usersJson   = []
        pictureList = ['/static/icons/pic_3.png','/static/icons/pic_7.png','/static/icons/pic_8.png','/static/icons/pic_9.png']
        for user in users:
            userItem = {}
            userItem['time'] = user.totalActiveTime
            userItem['name'] = user.username
            userItem['pict'] = pictureList[random.randint(0,3)]
            usersJson.append(userItem)
        response = JsonResponse(usersJson , safe=False)
        return response
    else:
        response = JsonResponse([] , safe=False)
        return HttpResponseRedirect('/')




@deprecate_current_app
@sensitive_post_parameters()
@csrf_protect
@never_cache
def ajax_hotquestion(request):
    if request.is_ajax():
        questions = question.objects.order_by('-answerNumber')[0:5]
        questionJson = []
        for q in questions:
            temp = {}
            temp['id']           = q.id
            temp['title']        = q.title
            temp['answernumber'] = q.answerNumber
            questionJson.append(temp)
        response = JsonResponse(questionJson , safe=False)
        return response
    else:
        response = JsonResponse([] , safe=False)
        return response




@deprecate_current_app
@sensitive_post_parameters()
@csrf_protect
@never_cache
def ajax_search(request,content):
    if request.is_ajax():

        contentList = processSQLSymbol(content)
        print content
        print contentList
        questions = question.objects.none()
        for item in contentList:
            questions = questions|question.objects.filter(title__contains=item)
        print questions
        questionJson = []

        for q in questions:
            temp = {}
            temp['id']              = q.id
            temp['title']           = q.title
            temp['tag']             = q.tag
            temp['content']         = q.content
            try:
                temp['time']            = q.time.strftime("%Y-%m-%d %H:%M")
            except:
                temp['time']            = q.time
            temp['From']            = unicode(q.From)
            answers = answer.objects.filter(questionid=q.id)
            temp['answernumber']    = len(answers)
            questionJson.append(temp)
        response = JsonResponse({'_question':questionJson})
        response.set_cookie('_searchcontent',content) 
        return response
    else:
        return HttpResponseRedirect('/')




################################################################################
#KEY WORD FILTER.
import copy
content  = 'select * from order by AbC where bv<.*|'

#This function is used for filter the sql check symbol.
def processSQLSymbol(content):
    content  = content.lower()
    symbolList = ['|','*','!','=','>','<','from','select','where']
    oldList = [content,]
    
    for symbol in symbolList:
        newList = []
        for item in oldList:
            tempList = item.split(symbol)
            newList.extend(tempList)
        oldList = copy.deepcopy(newList)

    #Filter all the none value.
    tempList = copy.deepcopy(newList)
    newList = []
    for item in tempList:
        if item in [' ',''] :
            pass
        else:
            newList.append(item.strip())
    return newList
################################################################################




@deprecate_current_app
@sensitive_post_parameters()
@csrf_protect
@never_cache
def ajax_question(request,QID):
    questions = question.objects.filter(id=QID)
    questionJson = []
    for q in questions:
        temp = {}
        temp['id']              = q.id
        temp['title']           = q.title
        temp['tag']             = q.tag
        temp['content']         = q.content
        try:
            temp['time']            = q.time.strftime("%Y-%m-%d %H:%M")
        except:
            temp['time']            = q.time
        temp['From']            = unicode(q.From)
        questionJson.append(temp)

    return JsonResponse(questionJson, safe=False)




@deprecate_current_app
@sensitive_post_parameters()
@csrf_protect
@never_cache
def ajax_addquestion(request, template_name='question/addquestion.html',
          redirect_field_name=REDIRECT_FIELD_NAME,
          question_form=questionForm,
          extra_context=None):
    """
    Displays the login form and handles the login action.
    """
    redirect_to = request.POST.get(redirect_field_name,
                                   request.GET.get(redirect_field_name, ''))

    if request.is_ajax():
        if request.user.is_authenticated() or request.method == "POST":

            #preprocess this request data.
            postTag = ''

            if list(request.POST) != []:
                taglist = request.POST.getlist('tag[]')
                for i in taglist:
                    postTag += i + ','
                
            form = question_form(request.POST)
            if request.POST.get('title'):
                title = request.POST.get('title').strip()
                print "number is "+str(question.objects.filter(title__contains=title).count())
                if question.objects.filter(title__contains=title).count() != 0:
                    current_site = get_current_site(request)
                    context = {
                        'form': form,
                        redirect_field_name: redirect_to,
                        'site': current_site,
                        'site_name': current_site.name,
                    }
                    extra_context = {"errorinfo":u"问题已存在."}
                    context.update(extra_context)
                    return TemplateResponse(request, template_name, context)
            
            if form.is_valid():
                
                # Ensure the user-originating redirection url is safe.
                if not is_safe_url(url=redirect_to, host=request.get_host()):
                    redirect_to = resolve_url(settings.LOGIN_REDIRECT_URL)
                
                new_question = form.save(commit = False)
                new_question.tag = postTag
                
                try:
                    user = customUser.objects.filter(username = request.user)[0]
                    new_question.From = user
                    new_question.save()
                    #new_question.time = datetime.datetime.now()
                    new_question.time = django.utils.timezone.now()
                    user.totalActiveTime += 1
                    user.save()

                    return JsonResponse( {'status':'ture'} )
                except:
                    return JsonResponse( {'status':'false'} )
                
            elif request.COOKIES.get("_username") == 'Anonymous':
                return JsonResponse( {'status':'false'} )

            else:
                form = question_form({'title':"",'tag':[],'content':""})

                current_site = get_current_site(request)

                context = {
                    'form': form,
                    redirect_field_name: redirect_to,
                    'site': current_site,
                    'site_name': current_site.name,
                }

                if extra_context is not None:
                    context.update(extra_context)

                return TemplateResponse(request, template_name, context)

        else:
            return JsonResponse( {'status':'false'} )
    else:
        return HttpResponseRedirect('/')




def ajax_answer(request,QID):
    answers = answer.objects.filter(questionid=QID)
    answerJson = []
    for a in answers:
        temp = {}
        temp['id']           = a.id
        temp['questionid']   = unicode(a.questionid)
        temp['content']      = a.content

        try:
            temp['time']            = a.time.strftime("%Y-%m-%d %H:%M")
        except:
            temp['time']            = a.time
        temp['From']         = unicode(a.From)
        answerJson.append(temp)

    if request.is_ajax():
        return JsonResponse(answerJson, safe=False)
    else:
        #return HttpResponseRedirect(request.path)
        #print answerJson
        return render_to_response('question/answer.html', {'id':QID})



 
def ajax_addanswer(request,QID):
    "Add new answer to this question."
    if request.is_ajax():
        if request.POST and request.user.is_authenticated():
            QID        = request.POST['questionid']
            user       = customUser.objects.filter(username=request.user)[0]
            comment    = request.POST['content']
            questionObjects  = question.objects.filter(id=int(QID))
            questionItem = questionObjects[0]

            newanswer = answer(questionid=questionItem,content=comment,From=user,time=django.utils.timezone.now())
            newanswer.save()
            user.totalActiveTime += 1
            user.save()
            questionItem.answerNumber += 1
            questionItem.save()

            return JsonResponse( {'status':'ture'} )
        else:
            return JsonResponse( {'status':'false'} )
    else:
        return render_to_response('question/answer.html', {'id':QID})




def ajax_policy(request):
    "return a policy content."
    if request.is_ajax():
        if request.POST:
            return render_to_response('question/policy.html')
    return render_to_response('question/policy.html')




# def ajax_login(request):
#     if request.POST:
#         postData    = request.POST.copy()

#         currentUser = User.objects.filter(name=request.POST['name'])
#         if currentUser[0]:
#             if currentUser[0].password == request.POST['password']:
#                 print request.session.keys()
#                 for item in request.session.keys():
#                     print item,request.session[item]
#                 request.session['user_id'] = currentUser[0].name

#                 return JsonResponse( {'status':'ture','sessionid':currentUser[0].name} )

#     return JsonResponse( {'status':'false'} )




# def ajax_logout(request):
#     if request.POST:      
#         try:
#             del request.session['user_id']
#             for item in request.session.keys():
#                 print item,request.session[item]
#         except KeyError:
#             pass

#         return JsonResponse( {'status':'ture'} )

#     return JsonResponse( {'status':'false'} )





# def ajax_register(request):
#     if request.POST:
#         postData    = request.POST.copy()
#         currentUser = User.objects.filter(name=request.POST['name'])

#         if len(currentUser) == 0 and request.user == 'AnonymousUser':
#             newName     = request.POST['name']
#             newEmail    = request.POST['email']
#             newPassword = request.POST['password']
#             newUser     = User(name=newName,email=newEmail,password=newPassword)
#             newUser.save()
#             #print newName,newEmail,newPassword,User.objects.filter(name=request.POST['name'])

#             return JsonResponse( {'status':'ture'} )
#     return JsonResponse( {'status':'false'} )




# class User(models.Model):
#     id          = models.AutoField(primary_key=True)
#     name        = models.CharField(max_length=100)
#     pic         = models.FileField()
#     description = models.CharField(max_length=400)
#     password    = models.CharField(max_length=20)
#     lastlogin   = models.DateField()


#     def __unicode__(self):
#         return unicode(self.name)


# # Create your models here.
# class question(models.Model):
#     id          = models.AutoField(primary_key=True)
#     title   = models.CharField(max_length=200)
#     tag     = ListField()
#     content = CompressedTextField()
#     time    = models.DateField()
#     From    = models.ForeignKey('User')

#     def __unicode__(self):
#         return unicode(self.title)


# # Create your models here.
# class answer(models.Model):
#     id          = models.AutoField(primary_key=True)
#     questionid  = models.ForeignKey('question')
#     content     = CompressedTextField()
#     time        = models.DateField()
#     From        = models.ForeignKey('User')

#     def __unicode__(self):
#         return unicode(self.content)


#SESSIONID PROCESS.
#FIRST YOU SHOULD KNOW THAT SESSIONID WILL BE BOUNDLE WITH CUSTOMUSER MODLES.