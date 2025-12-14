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
		passiveAtkMultiplierPercentage: number;
		passiveDefMultiplierPercentage: number;
		supportAtkMultiplierPercentage: number;
		supportDefMultiplierPercentage: number;
	};
} {
	const passiveAtkMultiplier =
		(1 + stats.Pskill_atk_1 / 100) * (1 + stats.Pskill_atk_2 / 100);
	const passiveDefMultiplier =
		(1 + stats.Pskill_def_1 / 100) * (1 + stats.Pskill_def_2 / 100);
	const supportAtkMultiplier =
		(1 + stats.support_atk_1 / 100) *
		(1 + stats.support_atk_2 / 100) *
		(1 + stats.support_atk_active / 100) *
		(1 + stats.support_atk_field / 100) *
		(1 + stats.support_atk_memory / 100) *
		(1 + stats.support_atk_item / 100);
	const supportDefMultiplier =
		(1 + stats.support_def_1 / 100) *
		(1 + stats.support_def_2 / 100) *
		(1 + stats.support_def_active / 100) *
		(1 + stats.support_def_field / 100) *
		(1 + stats.support_def_memory / 100) *
		(1 + stats.support_def_item / 100);
	const passiveAtkMultiplierPercentage = Math.round(
		(passiveAtkMultiplier - 1) * 100,
	);
	const passiveDefMultiplierPercentage = Math.round(
		(passiveDefMultiplier - 1) * 100,
	);
	const supportAtkMultiplierPercentage = Math.round(
		(supportAtkMultiplier - 1) * 100,
	);
	const supportDefMultiplierPercentage = Math.round(
		(supportDefMultiplier - 1) * 100,
	);
	const statsMultipliers = {
		passiveAtkMultiplierPercentage,
		passiveDefMultiplierPercentage,
		supportAtkMultiplierPercentage,
		supportDefMultiplierPercentage,
	};
	return {
		statsMultipliers,
	};
}
