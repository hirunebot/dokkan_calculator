import Input from "@/components/ui/Input";
import type { DokkanStats } from "@/lib/types";

interface LeaderSkillFormProps {
	stats: DokkanStats;
	onChange: (field: keyof DokkanStats, value: number) => void;
}

export default function LeaderSkillForm({
	stats,
	onChange,
}: LeaderSkillFormProps) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h3 className="text-lg font-semibold mb-4 text-gray-900">
				リーダースキル
			</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<h4 className="text-md font-medium mb-3 text-gray-700">
						自前リーダー
					</h4>
					<div className="space-y-3">
						<Input
							label="ATK上昇率"
							type="number"
							value={stats.Lskill_atk_1}
							onChange={(e) => onChange("Lskill_atk_1", Number(e.target.value))}
							suffix="%"
						/>
						<Input
							label="DEF上昇率"
							type="number"
							value={stats.Lskill_def_1}
							onChange={(e) => onChange("Lskill_def_1", Number(e.target.value))}
							suffix="%"
						/>
					</div>
				</div>
				<div>
					<h4 className="text-md font-medium mb-3 text-gray-700">
						フレンドリーダー
					</h4>
					<div className="space-y-3">
						<Input
							label="ATK上昇率"
							type="number"
							value={stats.Lskill_atk_2}
							onChange={(e) => onChange("Lskill_atk_2", Number(e.target.value))}
							suffix="%"
						/>
						<Input
							label="DEF上昇率"
							type="number"
							value={stats.Lskill_def_2}
							onChange={(e) => onChange("Lskill_def_2", Number(e.target.value))}
							suffix="%"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
