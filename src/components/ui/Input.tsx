import { forwardRef, useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	suffix?: string;
	disableSelectOnFocus?: boolean;
	allowDecimal?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			error,
			suffix,
			className = "",
			id: providedId,
			disableSelectOnFocus = false,
			allowDecimal = false,
			onFocus,
			onInput,
			value,
			...props
		},
		ref,
	) => {
		const generatedId = useId();
		const inputId = providedId || generatedId;

		// type="number" で value が 0 の場合は空文字列を表示
		const displayValue = props.type === "number" && value === 0 ? "" : value;

		const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
			if (!disableSelectOnFocus && e.target.type === "number") {
				e.target.select();
			}
			onFocus?.(e);
		};

		const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
			const target = e.target as HTMLInputElement;
			if (target.type === "number" && !allowDecimal) {
				target.value = target.value.replace(/[^0-9]/g, "");
			}
			onInput?.(e);
		};

		const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
			const target = e.target as HTMLInputElement;
			if (target.type === "number") {
				target.blur();
			}
		};

		return (
			<div className="w-full">
				{label && (
					<label
						htmlFor={inputId}
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						{label}
					</label>
				)}
				<div className="relative">
					<input
						ref={ref}
						id={inputId}
						onFocus={handleFocus}
						onInput={handleInput}
						onWheel={handleWheel}
						value={displayValue}
						className={`
              w-full h-10 px-3 py-2 border border-gray-300 rounded-md
              text-gray-900 font-medium
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500
              ${error ? "border-red-500" : ""}
              ${suffix ? "pr-12" : ""}
              ${className}
            `}
						{...props}
					/>
					{suffix && (
						<span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
							{suffix}
						</span>
					)}
				</div>
				{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
			</div>
		);
	},
);

Input.displayName = "Input";

export default Input;
