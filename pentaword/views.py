from django.shortcuts import render
from django.views.generic import View
from django.templatetags.static import static
import datetime
import random


class ViewWord(View):
    def __init__(self):
        self.future_date = ''
        self.time = datetime.datetime.now()
        self.currDay = int(self.time.strftime("%d"))
        self.currMonth = int(self.time.strftime("%m"))
        self.currYear = int(self.time.strftime("%Y"))
        self.file = static('static/wordlist_pt.txt')

    def leapYear(self, year):
        if (year % 100 != 0) and (year % 4 == 0):
            return True
        elif ((year % 100 == 0) and (year % 400 == 0)):
            return True
        else:
            return False

    def isLastMonthDay(self, day, month, year):
        evenmonth = [4, 6, 9, 11]

        if (day) == 31:
            return True
        elif (evenmonth.includes(month) == True and day == 30):
            return True
        elif ((self.leapYear(year) == False) and (month == 2) and (day == 28)):
            return True
        elif ((self.leapYear(year) == True) and (month == 2) and (day == 29)):
            return True
        else:
            return False

    def rand_word(self):
        with open(file=self.file) as text:
            rand_index = random.randint(0, len(text) - 1)
            word_rand = text[rand_index]

        return word_rand

    def get(self, request):

        # program is loaded, last day of month
        if self.future_date == '' and self.isLastMonthDay(self.currDay, self.currMonth, self.currYear) == True:
            self.future_date = 0
            dailyword = self.rand_word()
            contextstuff = {'dailyword': dailyword}
            return render(request, 'pentaword/pentaword.html', contextstuff)

        # program is loaded, not last day
        elif self.future_date == '' and self.isLastMonthDay(self.currDay, self.currMonth, self.currYear) == False:
            self.future_date = self.currDay + 1
            dailyword = self.rand_word()
            contextstuff = {'dailyword': dailyword}
            return render(request, 'pentaword/pentaword.html', contextstuff)

        # pprgram running, last day
        elif self.future_date == self.currDay and self.isLastMonthDay(self.currDay, self.currMonth, self.currYear) == False:
            self.future_date = 0
            dailyword = self.rand_word()
            contextstuff = {'dailyword': dailyword}
            return render(request, 'pentaword/pentaword.html', contextstuff)

        elif self.future_date == self.currDay and self.isLastMonthDay(self.currDay, self.currMonth, self.currYear) == False:
            self.future_date = self.currDay + 1
            dailyword = self.rand_word()
            contextstuff = {'dailyword': dailyword}
            return render(request, 'pentaword/pentaword.html', contextstuff)
