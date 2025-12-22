import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { KI_BONUS_OPTIONS } from "@/constants/dokkan";
import type { DokkanStats } from "@/lib/types";

interface LinkSkillFormProps {
	stats: DokkanStats;
	onChange: (field: keyof DokkanStats, value: number) => void;
}

export default function LinkSkillForm({ stats, onChange }: LinkSkillFormProps) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h3 className="text-lg font-semibold mb-4 text-gray-900">
				リンクスキル・気力
			</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-4">
					<Input
						label="リンクスキルATK上昇率"
						type="number"
						value={stats.link_atk}
						onChange={(e) => onChange("link_atk", Number(e.target.value))}
						suffix="%"
						allowDecimal
					/>
					<Input
						label="リンクスキルDEF上昇率"
						type="number"
						value={stats.link_def}
						onChange={(e) => onChange("link_def", Number(e.target.value))}
						suffix="%"
						allowDecimal
					/>
				</div>
				<div className="space-y-4">
					<Select
						label="気力ボーナス"
						value={stats.ki_bonus}
						onChange={(e) => onChange("ki_bonus", Number(e.target.value))}
						options={KI_BONUS_OPTIONS}
					/>
				</div>
			</div>
		</div>
	);
}
