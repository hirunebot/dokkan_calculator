import type {
	DamageCalculationInput,
	DamageCalculationResult,
	DokkanStats,
	FullCalculationResult,
} from "./types";

const MAX_UINT32 = 2 ** 32; // 4,294,967,296
const MAX_BASE_VALUE = 2 ** 32; // 基礎値の上限: 4,294,967,296
const MAX_PERCENTAGE_VALUE = 2 ** 32 * 100; // パーセンテージ値の上限: 429,496,729,600

export function calculateATK(stats: DokkanStats): {
	value: number;
	overflow: boolean;
} {
	const {
		stats_atk,
		Lskill_atk_1,
		Lskill_atk_2,
		Pskill_atk_1,
		Pskill_atk_2,
		support_atk_1,
		support_atk_2,
		support_atk_active,
		support_atk_item,
		support_atk_field,
		support_atk_memory,
		link_atk,
		SA_atk,
		SA_power,
		SAboost_level,
		ki_bonus,
	} = stats;

	let atk = stats_atk;
	atk *= 1 + (Lskill_atk_1 + Lskill_atk_2) / 100;
	atk = Math.floor(atk);
	atk *= 1 + Pskill_atk_1 / 100 + support_atk_1 / 100;
	atk = Math.floor(atk);
	atk *= 1 + Pskill_atk_2 / 100 + support_atk_2 / 100;
	atk = Math.floor(atk);
	atk *= 1 + support_atk_active / 100;
	atk = Math.floor(atk);
	atk *= 1 + support_atk_item / 100;
	atk = Math.floor(atk);
	atk *= 1 + support_atk_field / 100;
	atk = Math.floor(atk);
	atk *= 1 + support_atk_memory / 100;
	atk = Math.floor(atk);
	atk *= 1 + link_atk / 100;
	atk = Math.floor(atk);
	atk *= ki_bonus;
	atk = Math.floor(atk);
	atk *= SA_power + SA_atk / 100 + SAboost_level * 0.05;

	const result = Math.round(atk);
	const overflow = result >= MAX_UINT32;
	return {
		value: overflow ? 0 : result,
		overflow,
	};
}

export function calculateActiveSkillATK(
	stats: DokkanStats,
	activeSkillPower: number,
	temporaryATKBoost: number,
	SABoostLevel: number,
): { value: number; overflow: boolean } {
	const {
		stats_atk,
		Lskill_atk_1,
		Lskill_atk_2,
		Pskill_atk_1,
		Pskill_atk_2,
		support_atk_1,
		support_atk_2,
		support_atk_active,
		support_atk_item,
		support_atk_field,
		support_atk_memory,
		link_atk,
		SA_atk,
		ki_bonus,
	} = stats;

	let atk = stats_atk;
	atk *= 1 + (Lskill_atk_1 + Lskill_atk_2) / 100;
	atk = Math.floor(atk);
	atk *= 1 + Pskill_atk_1 / 100 + support_atk_1 / 100;
	atk = Math.floor(atk);
	atk *= 1 + Pskill_atk_2 / 100 + support_atk_2 / 100;
	atk = Math.floor(atk);
	atk *= 1 + support_atk_active / 100;
	atk = Math.floor(atk);
	atk *= 1 + support_atk_item / 100;
	atk = Math.floor(atk);
	atk *= 1 + support_atk_field / 100;
	atk = Math.floor(atk);
	atk *= 1 + support_atk_memory / 100;
	atk = Math.floor(atk);
	atk *= 1 + link_atk / 100;
	atk = Math.floor(atk);

	const activeSkillMultiplier = activeSkillPower + temporaryATKBoost / 100;
	atk *= activeSkillMultiplier + SABoostLevel * 0.05;
	atk = Math.floor(atk);
	atk *= 1 + SA_atk / 100;
	atk = Math.floor(atk);
	atk *= ki_bonus;
	atk = Math.floor(atk);

	const result = Math.round(atk);
	const overflow = result >= MAX_UINT32;
	return {
		value: overflow ? 0 : result,
		overflow,
	};
}

export function calculateDEF(stats: DokkanStats): {
	value: number;
	overflow: boolean;
} {
	const {
		stats_def,
		Lskill_def_1,
		Lskill_def_2,
		Pskill_def_1,
		Pskill_def_2,
		support_def_1,
		support_def_2,
		support_def_active,
		support_def_item,
		support_def_field,
		support_def_memory,
		SA_def,
		link_def,
	} = stats;

	let def = stats_def;
	def *= 1 + (Lskill_def_1 + Lskill_def_2) / 100;
	def = Math.floor(def);
	def *= 1 + Pskill_def_1 / 100 + support_def_1 / 100;
	def = Math.floor(def);
	def *= 1 + Pskill_def_2 / 100 + support_def_2 / 100;
	def = Math.floor(def);
	def *= 1 + support_def_active / 100;
	def = Math.floor(def);
	def *= 1 + support_def_item / 100;
	def = Math.floor(def);
	def *= 1 + support_def_field / 100;
	def = Math.floor(def);
	def *= 1 + support_def_memory / 100;
	def = Math.floor(def);
	def *= 1 + SA_def / 100;
	def = Math.floor(def);
	def *= 1 + link_def / 100;
	def = Math.floor(def);

	const result = Math.round(def);
	const overflow = result >= MAX_UINT32;
	return {
		value: overflow ? 0 : result,
		overflow,
	};
}

export function calculateDamageTaken(
	input: DamageCalculationInput,
): DamageCalculationResult {
	const { enemy_atk, damage_reduction, player_def } = input;
	const baseDamage = Math.max(0, enemy_atk - player_def);
	const damageReductionMultiplier = 1 - damage_reduction / 100;
	const finalDamage = Math.round(baseDamage * damageReductionMultiplier);
	return {
		damage_taken: Math.max(0, finalDamage),
		damage_reduction_percentage: damage_reduction,
	};
}

export function calculateFullStats(
	stats: DokkanStats,
	damageInput?: DamageCalculationInput,
): FullCalculationResult {
	const atkResult = calculateATK(stats);
	const defResult = calculateDEF(stats);

	const result: FullCalculationResult = {
		atk: atkResult.value,
		def: defResult.value,
		atkOverflow: atkResult.overflow,
		defOverflow: defResult.overflow,
	};

	if (damageInput) {
		const damageCalcInput: DamageCalculationInput = {
			...damageInput,
			player_def: defResult.value,
		};
		result.damage_calculation = calculateDamageTaken(damageCalcInput);
	}

	return result;
}

export function validateDokkanStats(stats: Partial<DokkanStats>): string[] {
	const errors: string[] = [];

	// 基礎ATK/DEFのバリデーション (2^32上限)
	if (stats.stats_atk !== undefined) {
		if (stats.stats_atk < 0) {
			errors.push("基礎ATKは0以上にしてください");
		}
		if (stats.stats_atk > MAX_BASE_VALUE) {
			errors.push("基礎ATKが上限を超えています");
		}
	}

	if (stats.stats_def !== undefined) {
		if (stats.stats_def < 0) {
			errors.push("基礎DEFは0以上にしてください");
		}
		if (stats.stats_def > MAX_BASE_VALUE) {
			errors.push("基礎DEFが上限を超えています");
		}
	}

	// パーセンテージフィールドのバリデーション ((2^32)*100上限)
	const percentageFields = [
		"Lskill_atk_1",
		"Lskill_def_1",
		"Lskill_atk_2",
		"Lskill_def_2",
		"Pskill_atk_1",
		"Pskill_def_1",
		"Pskill_atk_2",
		"Pskill_def_2",
		"support_atk_1",
		"support_def_1",
		"support_atk_2",
		"support_def_2",
		"support_atk_active",
		"support_def_active",
		"support_atk_field",
		"support_def_field",
		"support_atk_memory",
		"support_def_memory",
		"support_atk_item",
		"support_def_item",
		"SA_atk",
		"SA_def",
		"link_atk",
		"link_def",
	];

	percentageFields.forEach((field) => {
		const value = stats[field as keyof DokkanStats];
		if (value !== undefined && typeof value === "number") {
			if (value < 0) {
				errors.push(`${field}は0以上にしてください`);
			}
			if (value > MAX_PERCENTAGE_VALUE) {
				errors.push(`${field}が上限を超えています`);
			}
		}
	});

	if (
		stats.ki_bonus !== undefined &&
		(stats.ki_bonus < 0.1 || stats.ki_bonus > 2.0)
	) {
		errors.push("気力ボーナスを選択してください");
	}

	if (
		stats.SAboost_level !== undefined &&
		(stats.SAboost_level < 0 || stats.SAboost_level > 50)
	) {
		errors.push("必殺威力アップレベルは50以下にしてください");
	}

	return errors;
}
