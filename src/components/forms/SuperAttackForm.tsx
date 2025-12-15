import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { SA_POWER_OPTIONS } from "@/constants/dokkan";
import type { DokkanStats } from "@/lib/types";

interface SuperAttackFormProps {
	stats: DokkanStats;
	handleStatChange: (field: keyof DokkanStats, value: number) => void;
	useActiveSkill: boolean;
	setUseActiveSkill: (use: boolean) => void;
}

export default function SuperAttackForm({
	stats,
	handleStatChange,
	useActiveSkill,
	setUseActiveSkill,
}: SuperAttackFormProps) {
	return (
		<div className="space-y-6">
			<div className="bg-white p-6 rounded-lg shadow-md">
				<h3 className="text-lg font-semibold mb-4 text-gray-900">必殺技</h3>
				<div className="mb-4">
					<label className="flex items-center cursor-pointer">
						<input
							type="checkbox"
							checked={useActiveSkill}
							onChange={(e) => setUseActiveSkill(e.target.checked)}
							className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
						/>
						<span className="text-sm font-medium text-gray-700">
							攻撃アクティブを使用する
						</span>
					</label>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="space-y-4">
						<Select
							label="必殺威力"
							value={stats.SA_power}
							onChange={(e) =>
								handleStatChange("SA_power", Number(e.target.value))
							}
							options={SA_POWER_OPTIONS}
						/>
						<Input
							label="必殺威力アップレベル"
							type="number"
							value={stats.SAboost_level}
							onChange={(e) =>
								handleStatChange("SAboost_level", Number(e.target.value))
							}
						/>
					</div>
					<div className="space-y-4">
						<Input
							label="必殺追加効果ATK上昇率"
							type="number"
							value={stats.SA_atk}
							onChange={(e) =>
								handleStatChange("SA_atk", Number(e.target.value))
							}
							suffix="%"
						/>
						<Input
							label="必殺追加効果DEF上昇率"
							type="number"
							value={stats.SA_def}
							onChange={(e) =>
								handleStatChange("SA_def", Number(e.target.value))
							}
							suffix="%"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
