import type { DokkanStats } from "./types";

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

export function calculateStatMultipliers(stats: DokkanStats): {
	statsMultipliers: {
		atkMultiplierPercentage: number;
		defMultiplierPercentage: number;
	};
} {
	const atkMultiplier =
		(1 + stats.Pskill_atk_1 / 100 + stats.support_atk_1 / 100) *
		(1 + stats.Pskill_atk_2 / 100 + stats.support_atk_2 / 100) *
		(1 + stats.support_atk_active / 100) *
		(1 + stats.support_atk_field / 100) *
		(1 + stats.support_atk_memory / 100) *
		(1 + stats.support_atk_item / 100);
	const defMultiplier =
		(1 + stats.Pskill_def_1 / 100 + stats.support_def_1 / 100) *
		(1 + stats.Pskill_def_2 / 100 + stats.support_def_2 / 100) *
		(1 + stats.support_def_active / 100) *
		(1 + stats.support_def_field / 100) *
		(1 + stats.support_def_memory / 100) *
		(1 + stats.support_def_item / 100);
	const atkMultiplierPercentage = Math.round((atkMultiplier - 1) * 100);
	const defMultiplierPercentage = Math.round((defMultiplier - 1) * 100);
	const statsMultipliers = {
		atkMultiplierPercentage,
		defMultiplierPercentage,
	};
	return {
		statsMultipliers,
	};
}
