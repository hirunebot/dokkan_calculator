import Input from "@/components/ui/Input";
import type { DokkanStats } from "@/lib/types";

interface StatsFormProps {
	stats: DokkanStats;
	onChange: (field: keyof DokkanStats, value: number) => void;
}

export default function StatsForm({ stats, onChange }: StatsFormProps) {
	return (
		<div className="bg-white p-6 rounded-lg shadow-md">
			<h3 className="text-lg font-semibold mb-4 text-gray-900">
				基礎ステータス
			</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Input
					label="ATK"
					type="number"
					value={stats.stats_atk}
					onChange={(e) => onChange("stats_atk", Number(e.target.value))}
				/>
				<Input
					label="DEF"
					type="number"
					value={stats.stats_def}
					onChange={(e) => onChange("stats_def", Number(e.target.value))}
				/>
			</div>
		</div>
	);
}
