import React from 'react';

interface Stat {
    label: string;
    value: string;
    color?: string;
    textColor?: string;
}

interface ImprovementStatsProps {
    stats: Stat[];
    className?: string;
    title?: string;
}

const ImprovementMetrics: React.FC<ImprovementStatsProps> = ({ stats, className = '', title }) => {
    return (
        <div className={`${className}`}>
            {title && (
                <h2 className="text-xl font-medium text-[#2E5C8A] mb-6">
                    {title}
                </h2>
            )}
            <div className="space-y-6">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className={`${stat.color || 'bg-[#2E5C8A]'} rounded-[35%] w-32 h-32 flex flex-col items-center justify-center ${stat.textColor || 'text-white'}`}>
                            <div className="text-3xl font-semibold mb-1">{stat.value}</div>
                            <div className="text-sm opacity-80">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImprovementMetrics;

