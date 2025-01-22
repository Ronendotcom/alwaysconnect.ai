import React from 'react';

export interface MetricItem {
    label: string;
    value: string | number;
    unit: string;
    color?: string;
    change?: {
        value: string;
        direction: 'up' | 'down';
    };
    improvement?: {
        value: string;
        label: string;
    };
}

interface NetworkMetricsProps {
    metrics: MetricItem[];
    className?: string;
    title?: string;
    titleColor?: string;
    showChanges?: boolean;
}

const NetworkMetrics: React.FC<NetworkMetricsProps> = ({
                                                           metrics,
                                                           className = '',
                                                           title,
                                                           titleColor = 'text-[#2E5C8A]',
                                                           showChanges = false
                                                       }) => {
    return (
        <div className={`w-full ${className}`}>
            {title && (
                <h2 className={`text-xl font-medium mb-6 ${titleColor} h-8`}>
                    {title}
                </h2>
            )}
            <div className="space-y-4">
                {metrics.map((metric, index) => (
                    <div key={index} className="grid grid-cols-[120px_1fr] gap-3 items-center bg-gray-100 rounded-full pl-3 h-16">
                        <div className="text-[#2E5C8A] font-medium">{metric.label}</div>
                        <div className="flex items-center gap-2">
                            {showChanges && (
                                <div
                                    className={`
                                    w-14 h-14 flex-shrink-0
                                    flex items-center justify-center
                                    ${metric.color || 'bg-[#2E5C8A]'} text-white rounded-full text-sm
                                    ${metric.change ? 'opacity-100' : 'opacity-0'}`
                                    }
                                >
                                    {metric.change?.value || '+0'}
                                </div>
                            )}
                            <div
                                className={`
                                ${metric.color || 'bg-[#2E5C8A]'}
                                text-white rounded-b-full rounded-tl-none rounded-tr-full py-2 px-6
                                flex items-center gap-2 flex-1 min-w-[200px] h-14`
                                }
                            >
                                <span className="text-xl font-medium">{metric.value}</span>
                                <span className="text-sm opacity-80">{metric.unit}</span>
                                {metric.improvement && (
                                    <div className="bg-[#F6B851] text-black rounded-full px-3 py-1 text-sm ml-auto">
                                        {metric.improvement.value}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NetworkMetrics;