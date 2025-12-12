import type { DokkanStats } from "./types";

export interface StatsPreset {
	name: string;
	description: string;
	stats: DokkanStats;
}

export const DOKKAN_PRESETS: StatsPreset[] = [
	{
		name: "デフォルト",
		description: "基本設定",
		stats: {
			stats_atk: 15000,
			stats_def: 10000,
			Lskill_atk_1: 200,
			Lskill_def_1: 200,
			Lskill_atk_2: 200,
			Lskill_def_2: 200,
			Pskill_atk_1: 0,
			Pskill_def_1: 0,
			Pskill_atk_2: 0,
			Pskill_def_2: 0,
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
			SA_atk: 0,
			SA_def: 0,
			SA_power: 5.7,
			SAboost_level: 6,
			link_atk: 0,
			link_def: 0,
			ki_bonus: 2.0,
		},
	},
];
