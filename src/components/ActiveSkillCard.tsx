import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { ACTIVE_SKILL_POWER_OPTIONS } from "@/constants/dokkan";

interface ActiveSkillCardProps {
	activeSkillPower: number;
	temporaryATKBoost: number;
	onChange: (
		field: "activeSkillPower" | "temporaryATKBoost",
		value: number,
	) => void;
}

export default function ActiveSkillCard({
	activeSkillPower,
	temporaryATKBoost,
	onChange,
}: ActiveSkillCardProps) {
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
						onChange={(e) =>
							onChange("activeSkillPower", Number(e.target.value))
						}
						options={ACTIVE_SKILL_POWER_OPTIONS}
					/>
				</div>
				<div className="space-y-4">
					<Input
						label="一時的ATK上昇率"
						type="number"
						value={temporaryATKBoost}
						onChange={(e) =>
							onChange("temporaryATKBoost", Number(e.target.value))
						}
						suffix="%"
					/>
				</div>
			</div>
		</div>
	);
}
