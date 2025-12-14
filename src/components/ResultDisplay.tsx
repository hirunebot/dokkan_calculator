import type { FullCalculationResult } from "@/lib/types";

interface ResultDisplayProps {
	result: FullCalculationResult | null;
	isCalculating?: boolean;
	statsMultipliers?: {
		atkMultiplierPercentage: number;
		defMultiplierPercentage: number;
	};
}

export default function ResultDisplay({
	result,
	isCalculating = false,
	statsMultipliers,
}: ResultDisplayProps) {
	if (isCalculating) {
		return (
			<div className="bg-white p-6 rounded-lg shadow-md">
				<h3 className="text-lg font-semibold mb-4 text-gray-900">計算結果</h3>
				<div className="animate-pulse">
					<div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
					<div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
					<div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
					<div className="h-8 bg-gray-200 rounded w-1/2"></div>
				</div>
			</div>
		);
	}

	if (!result) {
		return (
			<div className="bg-white p-6 rounded-lg shadow-md">
				<h3 className="text-lg font-semibold mb-4 text-gray-900">計算結果</h3>
				<p className="text-gray-500">ステータスを入力して計算してください。</p>
			</div>
		);
	}

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h3 className="text-lg font-semibold mb-4 text-gray-900">計算結果</h3>

			{(result.atkOverflow || result.defOverflow) && (
				<div className="mb-4 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
					<ul className="text-sm text-red-600 list-disc list-inside">
						{result.atkOverflow && <li>ATK値がオーバーフローしました</li>}
						{result.defOverflow && <li>DEF値がオーバーフローしました</li>}
					</ul>
				</div>
			)}

			<div className="space-y-4">
				<div className="p-4 bg-red-50 border border-red-200 rounded-lg">
					<h4 className="text-sm font-medium text-red-800 mb-1">ATK</h4>
					<p className="text-3xl font-bold text-red-900 break-all">
						{result.atk.toLocaleString()}
					</p>
				</div>

				<div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
					<h4 className="text-sm font-medium text-blue-800 mb-1">DEF</h4>
					<p className="text-3xl font-bold text-blue-900 break-all">
						{result.def.toLocaleString()}
					</p>
				</div>

				{result.damage_calculation && (
					<div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
						<h4 className="text-sm font-medium text-orange-800 mb-1">
							被ダメージ
						</h4>
						<p className="text-3xl font-bold text-orange-900 break-all">
							{result.damage_calculation.damage_taken.toLocaleString()}
						</p>
					</div>
				)}
			</div>

			{statsMultipliers != null && (
				<div className="mt-6 space-y-2 px-1">
					<div className="flex justify-between items-center">
						<span className="text-sm font-medium text-gray-600">
							ATK倍率 (パッシブ・サポート)
						</span>
						<span className="text-base font-semibold text-gray-700">
							{statsMultipliers.atkMultiplierPercentage}%
						</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm font-medium text-gray-600">
							DEF倍率 (パッシブ・サポート)
						</span>
						<span className="text-base font-semibold text-gray-700">
							{statsMultipliers.defMultiplierPercentage}%
						</span>
					</div>
				</div>
			)}
		</div>
	);
}
