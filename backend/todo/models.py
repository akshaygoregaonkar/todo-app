from django.db import models

# Create your models here.

class Todolist(models.Model):
    task=models.CharField(max_length=100)
    description=models.TextField()
    date=models.TextField()
    checked=models.BooleanField(default=False,blank=True,null=True)

    def __str__(self):
        return  self.task



