from django.db import models


class Dataset(models.Model):
    x_train = models.CharField(max_length=200)
    y_train = models.CharField(max_length=200)
    width = models.IntegerField()
    height = models.IntegerField()
