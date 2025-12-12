import Input from "@/components/ui/Input";
import type { DokkanStats } from "@/lib/types";

interface SupportFormProps {
	stats: DokkanStats;
	onChange: (field: keyof DokkanStats, value: number) => void;
}

export default function SupportForm({ stats, onChange }: SupportFormProps) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h3 className="text-lg font-semibold mb-4 text-gray-900">サポート効果</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<div>
					<h4 className="text-md font-medium mb-3 text-gray-700">
						パッシブサポート①
					</h4>
					<div className="space-y-3">
						<Input
							label="ATK上昇率"
							type="number"
							value={stats.support_atk_1}
							onChange={(e) =>
								onChange("support_atk_1", Number(e.target.value))
							}
							suffix="%"
						/>
						<Input
							label="DEF上昇率"
							type="number"
							value={stats.support_def_1}
							onChange={(e) =>
								onChange("support_def_1", Number(e.target.value))
							}
							suffix="%"
						/>
					</div>
				</div>
				<div>
					<h4 className="text-md font-medium mb-3 text-gray-700">
						パッシブサポート②
					</h4>
					<div className="space-y-3">
						<Input
							label="ATK上昇率"
							type="number"
							value={stats.support_atk_2}
							onChange={(e) =>
								onChange("support_atk_2", Number(e.target.value))
							}
							suffix="%"
						/>
						<Input
							label="DEF上昇率"
							type="number"
							value={stats.support_def_2}
							onChange={(e) =>
								onChange("support_def_2", Number(e.target.value))
							}
							suffix="%"
						/>
					</div>
				</div>
				<div>
					<h4 className="text-md font-medium mb-3 text-gray-700">
						アクティブサポート
					</h4>
					<div className="space-y-3">
						<Input
							label="ATK上昇率"
							type="number"
							value={stats.support_atk_active}
							onChange={(e) =>
								onChange("support_atk_active", Number(e.target.value))
							}
							suffix="%"
						/>
						<Input
							label="DEF上昇率"
							type="number"
							value={stats.support_def_active}
							onChange={(e) =>
								onChange("support_def_active", Number(e.target.value))
							}
							suffix="%"
						/>
					</div>
				</div>
				<div>
					<h4 className="text-md font-medium mb-3 text-gray-700">
						フィールドサポート
					</h4>
					<div className="space-y-3">
						<Input
							label="ATK上昇率"
							type="number"
							value={stats.support_atk_field}
							onChange={(e) =>
								onChange("support_atk_field", Number(e.target.value))
							}
							suffix="%"
						/>
						<Input
							label="DEF上昇率"
							type="number"
							value={stats.support_def_field}
							onChange={(e) =>
								onChange("support_def_field", Number(e.target.value))
							}
							suffix="%"
						/>
					</div>
				</div>
				<div>
					<h4 className="text-md font-medium mb-3 text-gray-700">
						サポートメモリー
					</h4>
					<div className="space-y-3">
						<Input
							label="ATK上昇率"
							type="number"
							value={stats.support_atk_memory}
							onChange={(e) =>
								onChange("support_atk_memory", Number(e.target.value))
							}
							suffix="%"
						/>
						<Input
							label="DEF上昇率"
							type="number"
							value={stats.support_def_memory}
							onChange={(e) =>
								onChange("support_def_memory", Number(e.target.value))
							}
							suffix="%"
						/>
					</div>
				</div>
				<div>
					<h4 className="text-md font-medium mb-3 text-gray-700">
						アイテムサポート
					</h4>
					<div className="space-y-3">
						<Input
							label="ATK上昇率"
							type="number"
							value={stats.support_atk_item}
							onChange={(e) =>
								onChange("support_atk_item", Number(e.target.value))
							}
							suffix="%"
						/>
						<Input
							label="DEF上昇率"
							type="number"
							value={stats.support_def_item}
							onChange={(e) =>
								onChange("support_def_item", Number(e.target.value))
							}
							suffix="%"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
