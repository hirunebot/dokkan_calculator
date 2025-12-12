export const SA_POWER_OPTIONS = [
	{ value: 5.7, label: "超極大 レベル20" },
	{ value: 4.25, label: "極大 レベル20" },
	{ value: 5.05, label: "超絶特大 レベル10" },
	{ value: 4.3, label: "超特大 レベル10" },
	{ value: 6.2, label: "超極大 レベル25(極限)" },
	{ value: 4.5, label: "極大 レベル25(極限)" },
	{ value: 6.3, label: "超絶特大 レベル15(極限)" },
	{ value: 5.3, label: "超特大 レベル15(極限)" },
	{ value: 5.5, label: "究極（アクティブ判定）" },
] as const;

export const SABOOST_LEVEL_OPTIONS = [
	{ value: 0, label: "0" },
	{ value: 1, label: "1" },
	{ value: 2, label: "2" },
	{ value: 3, label: "3" },
	{ value: 4, label: "4" },
	{ value: 5, label: "5" },
	{ value: 6, label: "6" },
	{ value: 7, label: "7" },
	{ value: 8, label: "8" },
	{ value: 9, label: "9" },
	{ value: 10, label: "10" },
] as const;

export const KI_BONUS_OPTIONS = [
	{ value: 1.0, label: "1.0 (気力0)" },
	{ value: 1.2, label: "1.2 (気力1-2)" },
	{ value: 1.4, label: "1.4 (気力3-5)" },
	{ value: 1.6, label: "1.6 (気力6-8)" },
	{ value: 1.8, label: "1.8 (気力9-11)" },
	{ value: 2.0, label: "2.0 (気力12以上)" },
] as const;

export const ACTIVE_SKILL_POWER_OPTIONS = [
	{ value: 5.5, label: "究極 (5.5倍)" },
] as const;

export const FORM_SECTIONS = {
	BASIC_STATS: "基礎ステータス",
	LEADER_SKILLS: "リーダースキル",
	PASSIVE_SKILLS: "パッシブスキル",
	SUPPORT_EFFECTS: "サポート効果",
	SUPER_ATTACK: "必殺技",
	LINKS_AND_KI: "リンクスキル・気力",
	DAMAGE_CALCULATION: "被ダメージ計算",
} as const;
