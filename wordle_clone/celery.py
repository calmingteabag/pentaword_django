from __future__ import absolute_import
import os
import random
import requests
from pentaword.models import Word
from bs4 import BeautifulSoup
from celery import Celery
from celery.schedules import crontab


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pentaword.settings')
app = Celery('pentaword')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.update(BROKER_URL=os.environ['REDIS_URL'],
                CELERY_RESULT_BACKEND=os.environ['REDIS_URL'])

app.autodiscover_tasks()


@app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(
        crontab(minute='*/5'),
        update_daily_word(),
    )


@app.task
def update_daily_word():
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

    replacer_word = replacer(get_word())
    new_word = Word.objects.get(pk=1)
    new_word.dailyword = replacer_word
    new_word.save()
