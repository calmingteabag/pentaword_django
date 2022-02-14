from django.shortcuts import render
from bs4 import BeautifulSoup
import requests
import random
import datetime
import time
import schedule

daily_word = ''


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


def word_scheduler():
    global daily_word
    daily_word = replacer(get_word())

    schedule.every().day.at("00:01").do(word_scheduler)

    while True:
        schedule.run_pending()
        time.sleep(1)


def index(request):
    # on page calling do this, okay, but we get AGAIN into the problem of
    # script being run on the exact interval to change word.
    daily_word = 'Teste'
    contextstuff = {'dailyword': daily_word}

    return render(request, 'pentaword\pentaword.html', contextstuff)
