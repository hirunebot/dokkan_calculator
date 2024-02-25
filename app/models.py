from django.db import models

# Create your models here.
class Stats(models.Model):
    slug = models.SlugField()
    stats_atk = models.IntegerField()
    stats_def = models.IntegerField()
    Lskill_atk = models.IntegerField()
    Lskill_def = models.IntegerField()
    Pskill_atk_1 = models.IntegerField()
    Pskill_def_1 = models.IntegerField()
    Pskill_atk_2 = models.IntegerField()
    Pskill_def_2 = models.IntegerField()
    SA_atk = models.IntegerField()
    SA_def = models.IntegerField()
    ULSA_atl = models.IntegerField()
    ULSA_def = models.IntegerField()
    link_atk = models.IntegerField()
    link_def = models.IntegerField()
    SA_power = models.IntegerField()