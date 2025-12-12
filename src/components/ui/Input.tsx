import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	suffix?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, suffix, className = "", ...props }, ref) => {
		return (
			<div className="w-full">
				{label && (
					<label className="block text-sm font-medium text-gray-700 mb-1">
						{label}
					</label>
				)}
				<div className="relative">
					<input
						ref={ref}
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
