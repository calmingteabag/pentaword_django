from pentaword import views
from django.urls import path

urlpatterns = [
    # path('', views.ViewWord.as_view(), name='index')
    path('', views.GambiarraWord.as_view(), name='index')
]
