from django.shortcuts import render, redirect
from .models import Stats
from app.forms import CalculationForm

# Create your views here.
def mainpage(request):
    resultAtk = 0
    resultDefAfter = 0
    if request.method == "POST":
        stats_atk = int(request.POST['stats_atk'])
        stats_def = int(request.POST['stats_def'])
        Lskill_atk_1 = int(request.POST['Lskill_atk_1'])
        Lskill_def_1 = int(request.POST['Lskill_def_1'])
        Lskill_atk_2 = int(request.POST['Lskill_atk_2'])
        Lskill_def_2 = int(request.POST['Lskill_def_2'])
        Pskill_atk_1 = int(request.POST['Pskill_atk_1'])
        Pskill_def_1 = int(request.POST['Pskill_def_1'])
        Pskill_atk_2 = int(request.POST['Pskill_atk_2'])
        Pskill_def_2 = int(request.POST['Pskill_def_2'])
        support_atk_1 = int(request.POST['support_atk_1'])
        support_def_1 = int(request.POST['support_def_1'])
        support_atk_2 = int(request.POST['support_atk_2'])
        support_def_2 = int(request.POST['support_def_2'])
        support_atk_active = int(request.POST['support_atk_active'])
        support_def_active = int(request.POST['support_def_active'])
        support_atk_field = int(request.POST['support_atk_field'])
        support_def_field = int(request.POST['support_def_field'])
        support_atk_memory = int(request.POST['support_atk_memory'])
        support_def_memory= int(request.POST['support_def_memory'])
        support_atk_item = int(request.POST['support_atk_item'])
        support_def_item = int(request.POST['support_def_item'])
        SA_atk = int(request.POST['SA_atk'])
        SA_def = int(request.POST['SA_def'])
        link_atk = int(request.POST['link_atk'])
        link_def = int(request.POST['link_def'])
        SA_power = float(request.POST['SA_power'])
        SAboost_level = int(request.POST['SAboost_level'])
        ki_bonus = float(request.POST['ki_bonus'])
        
        if SA_power == 5.5:     #アクティブの場合
            resultAtk = (
                stats_atk * 
                (1 + (Lskill_atk_1 + Lskill_atk_2) / 100) *
                (1 + Pskill_atk_1 / 100 + support_atk_1 / 100) *
                (1 + Pskill_atk_2 / 100 + support_atk_2 / 100) *
                (1 + support_atk_active / 100) *
                (1 + support_atk_item / 100) *
                (1 + support_atk_field / 100) *
                (1 + support_atk_memory / 100) *
                (1 + link_atk / 100) *
                (SA_power + SAboost_level * 0.05) *
                (1 + SA_atk / 100) *
                ki_bonus
            )
        else:
            resultAtk = (
                stats_atk *
                (1 + (Lskill_atk_1 + Lskill_atk_2) / 100) *
                (1 + Pskill_atk_1 / 100 + support_atk_1 / 100) *
                (1 + Pskill_atk_2 / 100 + support_atk_2 / 100) *
                (1 + support_atk_active / 100) *
                (1 + support_atk_item / 100) *
                (1 + support_atk_field / 100) *
                (1 + support_atk_memory / 100) *
                (1 + link_atk / 100) *
                (SA_power + SA_atk / 100 + SAboost_level * 0.05) *
                ki_bonus
            )
        resultAtk = round(resultAtk)    #整数にする
        resultDefAfter = (
            stats_def *
            (1 + (Lskill_def_1 + Lskill_def_2) / 100) *
            (1 + Pskill_def_1 / 100 + support_def_1 / 100) *
            (1 + Pskill_def_2 / 100 + support_def_2 / 100) *
            (1 + support_def_active / 100) *
            (1 + support_def_item / 100) *
            (1 + support_def_field / 100) *
            (1 + support_def_memory / 100) *
            (1 + SA_def / 100) *
            (1 + link_def / 100)
        )
        resultDefAfter = round(resultDefAfter)
        form = CalculationForm(request.POST)
        
    else:
        form = CalculationForm()
        
    return render(request, "calc/mainpage.html", {"form": form, "resultAtk": resultAtk, "resultDefAfter": resultDefAfter})