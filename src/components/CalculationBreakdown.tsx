import { useState } from "react";
import Button from "@/components/ui/Button";
import type { DokkanStats, FullCalculationResult } from "@/lib/types";
import {
	calculateStatPercentages,
	formatNumber,
	formatPercentage,
} from "@/lib/utils";

interface CalculationBreakdownProps {
	stats: DokkanStats;
	result: FullCalculationResult | null;
}

export default function CalculationBreakdown({
	stats,
	result,
}: CalculationBreakdownProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	if (!result) {
		return (
			<div className="bg-white p-6 rounded-lg shadow-md">
				<h3 className="text-lg font-semibold mb-4 text-gray-900">計算内訳</h3>
				<p className="text-gray-500">計算結果がありません。</p>
			</div>
		);
	}

	const breakdown = calculateStatPercentages(stats);

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-gray-900">計算内訳</h3>
				<Button
					onClick={() => setIsExpanded(!isExpanded)}
					variant="outline"
					size="sm"
				>
					{isExpanded ? "閉じる" : "詳細表示"}
				</Button>
			</div>

			{/* Summary */}
			<div className="grid grid-cols-2 gap-4 mb-4">
				<div className="p-3 bg-red-50 border border-red-200 rounded">
					<h4 className="text-sm font-medium text-red-800">ATK倍率</h4>
					<p className="text-lg font-bold text-red-900">
						{breakdown.totalAtkMultiplier.toFixed(2)}倍
					</p>
				</div>
				<div className="p-3 bg-blue-50 border border-blue-200 rounded">
					<h4 className="text-sm font-medium text-blue-800">DEF倍率</h4>
					<p className="text-lg font-bold text-blue-900">
						{breakdown.totalDefMultiplier.toFixed(2)}倍
					</p>
				</div>
			</div>

			{isExpanded && (
				<div className="space-y-4">
					{/* Base Stats */}
					<div>
						<h4 className="text-md font-medium mb-2 text-gray-700">
							基礎ステータス
						</h4>
						<div className="grid grid-cols-2 gap-2 text-sm">
							<div>ATK: {formatNumber(stats.stats_atk)}</div>
							<div>DEF: {formatNumber(stats.stats_def)}</div>
						</div>
					</div>

					{/* Leader Skills */}
					<div>
						<h4 className="text-md font-medium mb-2 text-gray-700">
							リーダースキル
						</h4>
						<div className="grid grid-cols-2 gap-2 text-sm">
							<div>
								ATK: {formatPercentage(breakdown.breakdown.leaderSkills.atk)}
							</div>
							<div>
								DEF: {formatPercentage(breakdown.breakdown.leaderSkills.def)}
							</div>
						</div>
					</div>

					{/* Passive Skills */}
					<div>
						<h4 className="text-md font-medium mb-2 text-gray-700">
							パッシブスキル
						</h4>
						<div className="grid grid-cols-2 gap-2 text-sm">
							<div>
								ATK: {formatPercentage(breakdown.breakdown.passiveSkills.atk)}
							</div>
							<div>
								DEF: {formatPercentage(breakdown.breakdown.passiveSkills.def)}
							</div>
						</div>
					</div>

					{/* Support Effects */}
					<div>
						<h4 className="text-md font-medium mb-2 text-gray-700">
							サポート効果合計
						</h4>
						<div className="grid grid-cols-2 gap-2 text-sm">
							<div>
								ATK: {formatPercentage(breakdown.breakdown.supportEffects.atk)}
							</div>
							<div>
								DEF: {formatPercentage(breakdown.breakdown.supportEffects.def)}
							</div>
						</div>
					</div>

					{/* Link Skills */}
					<div>
						<h4 className="text-md font-medium mb-2 text-gray-700">
							リンクスキル
						</h4>
						<div className="grid grid-cols-2 gap-2 text-sm">
							<div>
								ATK: {formatPercentage(breakdown.breakdown.linkSkills.atk)}
							</div>
							<div>
								DEF: {formatPercentage(breakdown.breakdown.linkSkills.def)}
							</div>
						</div>
					</div>

					{/* Super Attack */}
					<div>
						<h4 className="text-md font-medium mb-2 text-gray-700">
							必殺技効果
						</h4>
						<div className="grid grid-cols-3 gap-2 text-sm">
							<div>威力: {stats.SA_power}</div>
							<div>ATK追加: {formatPercentage(stats.SA_atk)}</div>
							<div>DEF追加: {formatPercentage(stats.SA_def)}</div>
						</div>
					</div>

					{/* Ki Bonus */}
					<div>
						<h4 className="text-md font-medium mb-2 text-gray-700">
							気力ボーナス
						</h4>
						<div className="text-sm">
							{stats.ki_bonus}倍
							<span className="text-gray-500 ml-2">
								(気力12以上で2.0倍が標準)
							</span>
						</div>
					</div>

					{/* Final Calculation */}
					<div className="border-t pt-4">
						<h4 className="text-md font-medium mb-2 text-gray-700">
							最終計算結果
						</h4>
						<div className="text-sm space-y-1">
							<div>
								ATK = {formatNumber(stats.stats_atk)} ×{" "}
								{breakdown.totalAtkMultiplier.toFixed(2)} × SA威力 ={" "}
								{formatNumber(result.atk)}
							</div>
							<div>
								DEF = {formatNumber(stats.stats_def)} ×{" "}
								{breakdown.totalDefMultiplier.toFixed(2)} ={" "}
								{formatNumber(result.def)}
							</div>
							{stats.SA_power === 5.5 && (
								<div className="text-orange-600 font-medium">
									※ アクティブスキル使用時の計算式が適用されています
								</div>
							)}
						</div>
					</div>

					{/* Damage Calculation */}
					{result.damage_calculation && (
						<div className="border-t pt-4">
							<h4 className="text-md font-medium mb-2 text-gray-700">
								被ダメージ計算
							</h4>
							<div className="text-sm space-y-1">
								<div>基礎ダメージ = 敵ATK - 自DEF</div>
								<div>最終被ダメージ = 基礎ダメージ × (1 - 軽減率/100)</div>
								<div className="font-medium">
									結果: {formatNumber(result.damage_calculation.damage_taken)}
									ダメージ
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
