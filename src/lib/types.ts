export interface DokkanStats {
	// Basic Stats
	stats_atk: number;
	stats_def: number;

	// Leader Skills
	Lskill_atk_1: number;
	Lskill_def_1: number;
	Lskill_atk_2: number;
	Lskill_def_2: number;

	// Passive Skills
	Pskill_atk_1: number;
	Pskill_def_1: number;
	Pskill_atk_2: number;
	Pskill_def_2: number;

	// Support Effects
	support_atk_1: number;
	support_def_1: number;
	support_atk_2: number;
	support_def_2: number;
	support_atk_active: number;
	support_def_active: number;
	support_atk_field: number;
	support_def_field: number;
	support_atk_memory: number;
	support_def_memory: number;
	support_atk_item: number;
	support_def_item: number;

	// Super Attack
	SA_atk: number;
	SA_def: number;
	SA_power: number;
	SAboost_level: number;

	// Others
	link_atk: number;
	link_def: number;
	ki_bonus: number;
}

export interface CalculationResult {
	atk: number;
	def: number;
}

export interface DamageCalculationInput {
	enemy_atk: number;
	damage_reduction: number;
	player_def: number;
}

export interface DamageCalculationResult {
	damage_taken: number;
	damage_reduction_percentage: number;
}

export interface FullCalculationResult extends CalculationResult {
	damage_calculation?: DamageCalculationResult;
	atkOverflow?: boolean;
	defOverflow?: boolean;
}

export const DEFAULT_DOKKAN_STATS: DokkanStats = {
	// Basic Stats
	stats_atk: 0,
	stats_def: 0,

	// Leader Skills (default 200%)
	Lskill_atk_1: 220,
	Lskill_def_1: 220,
	Lskill_atk_2: 220,
	Lskill_def_2: 220,

	// Passive Skills
	Pskill_atk_1: 0,
	Pskill_def_1: 0,
	Pskill_atk_2: 0,
	Pskill_def_2: 0,

	// Support Effects
	support_atk_1: 0,
	support_def_1: 0,
	support_atk_2: 0,
	support_def_2: 0,
	support_atk_active: 0,
	support_def_active: 0,
	support_atk_field: 0,
	support_def_field: 0,
	support_atk_memory: 0,
	support_def_memory: 0,
	support_atk_item: 0,
	support_def_item: 0,

	// Super Attack
	SA_atk: 0,
	SA_def: 0,
	SA_power: 5.7,
	SAboost_level: 6,

	// Others
	link_atk: 0,
	link_def: 0,
	ki_bonus: 2.0,
};
