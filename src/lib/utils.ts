import type { DokkanStats } from "./types";

export function formatNumber(num: number): string {
	return num.toLocaleString("ja-JP");
}

export function formatPercentage(num: number): string {
	return `${num}%`;
}

export function compareStats(
	statsA: DokkanStats,
	statsB: DokkanStats,
): {
	isDifferent: boolean;
	changedFields: (keyof DokkanStats)[];
} {
	const changedFields: (keyof DokkanStats)[] = [];

	for (const key in statsA) {
		const field = key as keyof DokkanStats;
		if (statsA[field] !== statsB[field]) {
			changedFields.push(field);
		}
	}

	return {
		isDifferent: changedFields.length > 0,
		changedFields,
	};
}

export function debounce<T extends (...args: never[]) => unknown>(
	func: T,
	wait: number,
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | undefined;

	return (...args: Parameters<T>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
}

export function deepClone<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}

export function getStatsDifference(
	baseStats: DokkanStats,
	currentStats: DokkanStats,
): Partial<DokkanStats> {
	const differences: Partial<DokkanStats> = {};

	for (const key in currentStats) {
		const field = key as keyof DokkanStats;
		if (currentStats[field] !== baseStats[field]) {
			differences[field] = currentStats[field];
		}
	}

	return differences;
}

export function calculateStatPercentages(stats: DokkanStats): {
	totalAtkMultiplier: number;
	totalDefMultiplier: number;
	breakdown: {
		leaderSkills: { atk: number; def: number };
		passiveSkills: { atk: number; def: number };
		supportEffects: { atk: number; def: number };
		linkSkills: { atk: number; def: number };
		superAttack: { atk: number; def: number };
	};
} {
	const leaderSkills = {
		atk: stats.Lskill_atk_1 + stats.Lskill_atk_2,
		def: stats.Lskill_def_1 + stats.Lskill_def_2,
	};

	const passiveSkills = {
		atk: stats.Pskill_atk_1 + stats.Pskill_atk_2,
		def: stats.Pskill_def_1 + stats.Pskill_def_2,
	};

	const supportEffects = {
		atk:
			stats.support_atk_1 +
			stats.support_atk_2 +
			stats.support_atk_active +
			stats.support_atk_field +
			stats.support_atk_memory +
			stats.support_atk_item,
		def:
			stats.support_def_1 +
			stats.support_def_2 +
			stats.support_def_active +
			stats.support_def_field +
			stats.support_def_memory +
			stats.support_def_item,
	};

	const linkSkills = {
		atk: stats.link_atk,
		def: stats.link_def,
	};

	const superAttack = {
		atk: stats.SA_atk,
		def: stats.SA_def,
	};

	// Calculate total multipliers (simplified)
	const totalAtkMultiplier =
		(1 + leaderSkills.atk / 100) *
		(1 + passiveSkills.atk / 100) *
		(1 + supportEffects.atk / 100) *
		(1 + linkSkills.atk / 100) *
		stats.ki_bonus;

	const totalDefMultiplier =
		(1 + leaderSkills.def / 100) *
		(1 + passiveSkills.def / 100) *
		(1 + supportEffects.def / 100) *
		(1 + linkSkills.def / 100) *
		(1 + superAttack.def / 100);

	return {
		totalAtkMultiplier,
		totalDefMultiplier,
		breakdown: {
			leaderSkills,
			passiveSkills,
			supportEffects,
			linkSkills,
			superAttack,
		},
	};
}
