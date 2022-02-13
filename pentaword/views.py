from django.shortcuts import render
from bs4 import BeautifulSoup
import requests
import random


def get_character():
    query_elements = ''

    htmlpage = requests.get(
        "https://www.dicio.com.br/palavras-com-cinco-letras/")
    bshandler = BeautifulSoup(htmlpage.content)

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


def index(request):
    dailyword = replacer(get_character())
    contextstuff = {'dailyword': dailyword}

    return render(request, 'pentaword\pentaword.html', contextstuff)
