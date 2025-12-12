import { useMemo, useState } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { ACTIVE_SKILL_POWER_OPTIONS } from "@/constants/dokkan";
import { calculateActiveSkillATK } from "@/lib/calculations";
import type { DokkanStats } from "@/lib/types";

interface ActiveSkillCardProps {
	stats: DokkanStats;
}

export default function ActiveSkillCard({ stats }: ActiveSkillCardProps) {
	const [activeSkillPower, setActiveSkillPower] = useState(5.5);
	const [temporaryATKBoost, setTemporaryATKBoost] = useState(0);

	const activeSkillATK = useMemo(() => {
		return calculateActiveSkillATK(
			stats,
			activeSkillPower,
			temporaryATKBoost,
			stats.SAboost_level,
		);
	}, [stats, activeSkillPower, temporaryATKBoost]);

	const formatNumber = (num: number) => {
		return num.toLocaleString("ja-JP");
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h3 className="text-lg font-semibold mb-4 text-gray-900">
				アクティブスキルATK
			</h3>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-4">
					<Select
						label="アクティブスキル威力"
						value={activeSkillPower}
						onChange={(e) => setActiveSkillPower(Number(e.target.value))}
						options={ACTIVE_SKILL_POWER_OPTIONS}
					/>
					<div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
						<p className="text-xs text-blue-700">
							<strong>必殺威力アップレベル:</strong> 必殺技設定と共有 (レベル
							{stats.SAboost_level})
						</p>
					</div>
				</div>
				<div className="space-y-4">
					<Input
						label="一時的ATK上昇率"
						type="number"
						value={temporaryATKBoost}
						onChange={(e) => setTemporaryATKBoost(Number(e.target.value))}
						suffix="%"
					/>
				</div>
			</div>

			<div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-md">
				<div className="flex justify-between items-center">
					<span className="text-sm font-medium text-gray-700">
						アクティブスキルATK
					</span>
					<span className="text-2xl font-bold text-gray-900">
						{formatNumber(activeSkillATK)}
					</span>
				</div>
				<p className="text-xs text-gray-600 mt-1">
					威力{activeSkillPower + temporaryATKBoost / 100}倍として計算
				</p>
			</div>
		</div>
	);
}
