from django.db import models

# Create your models here.


class Word(models.Model):
    dailyword = models.CharField(max_length=50)

    def __str__(self):
        return self.dailyword
