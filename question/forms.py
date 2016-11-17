from django import forms
from question.models import question
from question.models import answer
from question.models import customUser
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import (
    AuthenticationForm, PasswordChangeForm, PasswordResetForm, SetPasswordForm,
)


TAG_CHOICES = (('nuke','Nuke'),
    ('hiero','Hiero'),
    ('davinci','DaVinci'),
    ('maya','Maya'),
    ('houdini','Houdini'),
    ('c4d','C4D'))



class customUserCreationForm(UserCreationForm):
    "inherit from UserCreationForm"
    class Meta(UserCreationForm.Meta):
        model = customUser
        fields = ("username",)

    def save(self, commit=True):
        user = super(customUserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user



class customAuthenticationForm(AuthenticationForm):
    "inherit from AuthenticationForm"



class questionForm(forms.ModelForm):
    title = forms.CharField(max_length=200)
    tag = forms.MultipleChoiceField(
        required=False,
        widget=forms.CheckboxSelectMultiple,
        choices=TAG_CHOICES,
    )
    content = forms.TextInput()
    class Meta:
        model = question
        exclude = ('id','time','From','answerNumber')
        
        

class answerForm(forms.ModelForm):
    class Meta:
        model = answer
        fields = ('content',)