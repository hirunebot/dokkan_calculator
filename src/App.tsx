import { useCallback, useMemo, useState } from "react";
import DamageCalculationForm from "@/components/forms/DamageCalculationForm";
import LeaderSkillForm from "@/components/forms/LeaderSkillForm";
import LinkSkillForm from "@/components/forms/LinkSkillForm";
import PassiveSkillForm from "@/components/forms/PassiveSkillForm";
import StatsForm from "@/components/forms/StatsForm";
import SuperAttackForm from "@/components/forms/SuperAttackForm";
import SupportForm from "@/components/forms/SupportForm";
import ResultDisplay from "@/components/ResultDisplay";
import { calculateFullStats, validateDokkanStats } from "@/lib/calculations";
import type { DokkanStats, FullCalculationResult } from "@/lib/types";
import { DEFAULT_DOKKAN_STATS } from "@/lib/types";
import { calculateStatMultipliers, debounce } from "@/lib/utils";

export default function App() {
	const [stats, setStats] = useState<DokkanStats>(DEFAULT_DOKKAN_STATS);
	const [damageCalcEnabled, setDamageCalcEnabled] = useState(false);
	const [enemyAtk, setEnemyAtk] = useState(50000);
	const [damageReduction, setDamageReduction] = useState(0);
	const [_, setCalculationTrigger] = useState(0);

	const triggerCalculation = useCallback(
		debounce(() => setCalculationTrigger((prev) => prev + 1), 300),
		[],
	);

	const handleStatChange = useCallback(
		(field: keyof DokkanStats, value: number) => {
			setStats((prev) => ({
				...prev,
				[field]: value,
			}));
			triggerCalculation();
		},
		[triggerCalculation],
	);

	const handleDamageCalcChange = useCallback(
		(field: "enemyAtk" | "damageReduction", value: number) => {
			if (field === "enemyAtk") {
				setEnemyAtk(value);
			} else {
				setDamageReduction(value);
			}
			triggerCalculation();
		},
		[triggerCalculation],
	);

	const validationErrors = useMemo(() => validateDokkanStats(stats), [stats]);

	const calculationResult = useMemo((): FullCalculationResult | null => {
		if (validationErrors.length > 0) return null;

		const damageInput = damageCalcEnabled
			? {
					enemy_atk: enemyAtk,
					damage_reduction: damageReduction,
					player_def: 0,
				}
			: undefined;

		return calculateFullStats(stats, damageInput);
	}, [stats, damageCalcEnabled, enemyAtk, damageReduction, validationErrors]);

	const { statsMultipliers } = useMemo(
		() => calculateStatMultipliers(stats),
		[stats],
	);

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-center justify-between">
						<h1 className="text-3xl font-bold text-gray-900">ドカバト計算機</h1>
					</div>
					{validationErrors.length > 0 && (
						<div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
							<h4 className="text-sm font-medium text-red-800 mb-2">
								入力エラー:
							</h4>
							<ul className="text-sm text-red-700 space-y-1">
								{validationErrors.map((error) => (
									<li key={error}>• {error}</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</header>

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-6">
						<StatsForm stats={stats} onChange={handleStatChange} />

						<LeaderSkillForm stats={stats} onChange={handleStatChange} />

						<PassiveSkillForm stats={stats} onChange={handleStatChange} />

						<SupportForm stats={stats} onChange={handleStatChange} />

						<SuperAttackForm stats={stats} onChange={handleStatChange} />

						<LinkSkillForm stats={stats} onChange={handleStatChange} />

						<DamageCalculationForm
							enemyAtk={enemyAtk}
							damageReduction={damageReduction}
							onChange={handleDamageCalcChange}
							enabled={damageCalcEnabled}
							onToggle={setDamageCalcEnabled}
						/>
					</div>

					<div className="lg:col-span-1">
						<div className="sticky top-8 space-y-6">
							<ResultDisplay
								result={calculationResult}
								isCalculating={false}
								statsMultipliers={statsMultipliers}
							/>
						</div>
					</div>
				</div>
			</main>

			<footer className="bg-white border-t border-gray-200 mt-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<p className="text-center text-sm text-gray-500">
						本アプリは「ドラゴンボールZ
						ドッカンバトル」の非公式ファンツールです。
						<br />
						運営会社とは一切関係ありません。
					</p>
				</div>
			</footer>
		</div>
	);
}
