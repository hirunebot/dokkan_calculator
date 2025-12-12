import Input from "@/components/ui/Input";

interface DamageCalculationFormProps {
	enemyAtk: number;
	damageReduction: number;
	onChange: (field: "enemyAtk" | "damageReduction", value: number) => void;
	enabled: boolean;
	onToggle: (enabled: boolean) => void;
}

export default function DamageCalculationForm({
	enemyAtk,
	damageReduction,
	onChange,
	enabled,
	onToggle,
}: DamageCalculationFormProps) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold text-gray-900">被ダメージ計算</h3>
				<label className="flex items-center cursor-pointer">
					<input
						type="checkbox"
						checked={enabled}
						onChange={(e) => onToggle(e.target.checked)}
						className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
					/>
					<span className="text-sm text-gray-700">有効にする</span>
				</label>
			</div>

			{enabled && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Input
						label="敵ATK"
						type="number"
						value={enemyAtk}
						onChange={(e) => onChange("enemyAtk", Number(e.target.value))}
						placeholder="敵の攻撃力を入力"
					/>
					<Input
						label="ダメージ軽減率"
						type="number"
						value={damageReduction}
						onChange={(e) =>
							onChange("damageReduction", Number(e.target.value))
						}
						suffix="%"
						placeholder="0-100"
					/>
				</div>
			)}
		</div>
	);
}
