from django import forms
from .models import Stats

class CalculationForm(forms.Form):
    stats_atk = forms.IntegerField(label='ATK： ')
    stats_def = forms.IntegerField(label='DEF： ')
    Lskill_atk_1 = forms.IntegerField(label='ATK： ', initial=200)
    Lskill_def_1 = forms.IntegerField(label='DEF： ', initial=200)
    Lskill_atk_2 = forms.IntegerField(label='ATK： ', initial=200)
    Lskill_def_2 = forms.IntegerField(label='DEF： ', initial=200)
    Pskill_atk_1 = forms.IntegerField(label='ATK： ')
    Pskill_def_1 = forms.IntegerField(label='DEF： ')
    Pskill_atk_2 = forms.IntegerField(label='ATK： ')
    Pskill_def_2 = forms.IntegerField(label='DEF： ')
    support_atk_1 = forms.IntegerField(label='ATK： ', initial=0)
    support_def_1 = forms.IntegerField(label='DEF： ', initial=0)
    support_atk_2 = forms.IntegerField(label='ATK： ', initial=0)
    support_def_2 = forms.IntegerField(label='DEF： ', initial=0)
    support_atk_active = forms.IntegerField(label='ATK： ', initial=0)
    support_def_active = forms.IntegerField(label='DEF： ', initial=0)
    support_atk_field = forms.IntegerField(label='ATK： ', initial=0)
    support_def_field = forms.IntegerField(label='DEF： ', initial=0)
    support_atk_memory = forms.IntegerField(label='ATK： ', initial=0)
    support_def_memory = forms.IntegerField(label='DEF： ', initial=0)
    support_atk_item = forms.IntegerField(label='ATK： ', initial=0)
    support_def_item = forms.IntegerField(label='DEF： ', initial=0)
    SA_atk = forms.IntegerField(label='ATK： ', initial=0)          #必殺追加効果
    SA_def = forms.IntegerField(label='DEF： ', initial=0)
    ULSA_atk = forms.IntegerField(label='ATK： ', initial=0)
    ULSA_def = forms.IntegerField(label='DEF： ', initial=0)
    link_atk = forms.IntegerField(label='ATK： ', initial=0)
    link_def = forms.IntegerField(label='DEF： ', initial=0)
    SA_power = forms.ChoiceField(
        choices = (
            (5.7, '超極大 レベル20'),
            (4.25, '極大 レベル20'),
            (5.05, '超絶特大 レベル10'),
            (4.3, '超特大 レベル10'),
            (6.2, '超極大 レベル25(極限)'),
            (4.5, '極大 レベル25(極限)'),
            (6.3, '超絶特大 レベル15(極限)'),
            (5.3, '超特大 レベル15(極限)'),
            (5.5, '究極')
        ),
        required=True,
        widget=forms.widgets.Select
    )
    SAboost_level = forms.IntegerField(initial=6)
    ki_bonus = forms.FloatField(initial = 2.0)

class StatsForm(forms.ModelForm):
    class Meta:
        model = Stats
        fields = ["slug", "stats_atk", "stats_def", "Lskill_atk", "Lskill_def", "Pskill_atk_1", "Pskill_def_1", "Pskill_atk_2", "Pskill_def_2", "SA_atk", "SA_def", "ULSA_atl", "ULSA_def", "link_atk", "link_def", "SA_power"]