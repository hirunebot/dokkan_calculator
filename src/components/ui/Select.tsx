import { forwardRef, useId } from "react";

interface Option {
	value: number;
	label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	error?: string;
	options: readonly Option[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
	(
		{ label, error, options, className = "", id: providedId, ...props },
		ref,
	) => {
		const generatedId = useId();
		const selectId = providedId || generatedId;

		return (
			<div className="w-full">
				{label && (
					<label
						htmlFor={selectId}
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						{label}
					</label>
				)}
				<select
					ref={ref}
					id={selectId}
					className={`
            w-full h-10 px-3 py-2 border border-gray-300 rounded-md
            text-gray-900 font-medium
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
            ${error ? "border-red-500" : ""}
            ${className}
          `}
					{...props}
				>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
			</div>
		);
	},
);

Select.displayName = "Select";

export default Select;
