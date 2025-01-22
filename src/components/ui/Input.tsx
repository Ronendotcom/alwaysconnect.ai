interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    width?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = "", width = "w-full", ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-[#2E5C8A] font-medium mb-1">
                    {label}
                </label>
            )}
            <input
                className={`px-3 py-2 text-[#2E5C8A] rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 ${width} ${className}`}
                {...props}
            />
        </div>
    );
};
