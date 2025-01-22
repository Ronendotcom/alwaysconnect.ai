import React from 'react';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: string;
    isTestRunning?: boolean;
    children: React.ReactNode;
}

const CustomButton = ({
                          variant = 'reset',
                          isTestRunning = false,
                          children,
                          ...props
                      }: CustomButtonProps) => {
    const getButtonStyles = () => {
        if (variant === 'reset') {
            return "bg-white border border-black text-gray-700 hover:bg-gray-50";
        }

        // Run Test button styles
        if (isTestRunning) {
            return "bg-gray-100 text-gray-400 cursor-not-allowed";
        }
        return "bg-black text-white hover:bg-gray-800";
    };

    return (
        <button
            className={`px-8 py-2 rounded-full font-medium transition-all duration-200 ${getButtonStyles()}`}
            disabled={variant === 'runTest' && isTestRunning}
            {...props}
        >
            {children}
        </button>
    );
};

export default CustomButton;