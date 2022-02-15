from django.shortcuts import render
from django.views.generic import View
from pentaword.models import Word


class ViewWord(View):

    def get(self, request):
        # What it is doing is getting the single entry (primary key = 1) that contains
        # our daily word.
        word_obj = Word.objects.get(pk=1)
        daily_word = word_obj

        contextstuff = {'dailyword': daily_word}
        return render(request, 'pentaword/pentaword.html', contextstuff)
