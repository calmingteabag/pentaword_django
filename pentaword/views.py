from django.shortcuts import render
from bs4 import BeautifulSoup
import requests
import random
import datetime
import time
import schedule
from pentaword.models import Word
from django.views.generic import View


def get_word():
    query_elements = ''

    htmlpage = requests.get(
        "https://www.dicio.com.br/palavras-com-cinco-letras/")
    bshandler = BeautifulSoup(htmlpage.content, features="html.parser")

    bs_query = bshandler.find_all('p')

    for element in bs_query:
        query_elements += str(element)

    wordlist = query_elements.split('<br/>')
    word = random.choice(wordlist)

    return word


def replacer(word):
    replace_word = word
    newword = ''

    converter_dict = {
        '224': 'a',
        '225': 'a',
        '226': 'a',
        '227': 'a',
        '233': 'e',
        '234': 'e',
        '237': 'i',
        '243': 'o',
        '244': 'o',
        '245': 'o',
        '250': 'u',
        '231': 'c',
        '241': 'n',
    }

    for char in replace_word:
        if str(ord(char)) in converter_dict:
            replacer = converter_dict.get(str(ord(char)))
            newword += replacer
        else:
            newword += char

    return newword


class ViewWord(View):

    def get(self, request):

        word_obj = Word.objects.get(pk=1)
        daily_word = word_obj
        # What it is doing is getting the single entry (primary key = 1) that contains
        # our daily word.

        contextstuff = {'dailyword': daily_word}
        return render(request, 'pentaword\pentaword.html', contextstuff)

#### ON ANOTHER FUNCTION THAT WILL RUN A TASK: ####
        # run getrun() and replacer()

        # newword = Word.objects.get(pk=1)
        # newword.dailyword = ### returned webscrapped word goes here ###
        # newword.save()
