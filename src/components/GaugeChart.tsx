import React, { useState, useEffect } from "react";

interface GaugeChartProps {
    value: number | string;
    min: number;
    max: number;
    title: string;
    unit?: string;
    primaryColor?: string;
    secondaryColor?: string;
    subtitle?: string;
}

const GaugeChart: React.FC<GaugeChartProps> = ({
                                                   value,
                                                   min,
                                                   max,
                                                   title,
                                                   unit,
                                                   primaryColor = "#1E40AF",
                                                   secondaryColor = "#059669",
                                                   subtitle,
                                               }) => {
    const [animatedPrimaryValue, setAnimatedPrimaryValue] = useState(min);
    const [animatedSecondaryValue, setAnimatedSecondaryValue] = useState(min);
    const startAngle = 180;
    const endAngle = 360;
    const radius = 85;
    const cx = 100;
    const cy = 100;

    const [primaryValue, secondaryValue] = typeof value === "string"
        ? value.split("/").map(Number)
        : [Number(value), null];

    useEffect(() => {
        const duration = 1000;
        const steps = 60;
        const stepDuration = duration / steps;
        const primaryIncrement = (primaryValue - min) / steps;

        const timer = setInterval(() => {
            setAnimatedPrimaryValue(prev =>
                prev + primaryIncrement > primaryValue ? primaryValue : prev + primaryIncrement
            );
        }, stepDuration);

        return () => clearInterval(timer);
    }, [primaryValue, min]);

    useEffect(() => {
        if (secondaryValue !== null) {
            const duration = 1000;
            const steps = 60;
            const stepDuration = duration / steps;
            const secondaryIncrement = (secondaryValue - min) / steps;

            const timer = setInterval(() => {
                setAnimatedSecondaryValue(prev =>
                    prev + secondaryIncrement > secondaryValue ? secondaryValue : prev + secondaryIncrement
                );
            }, stepDuration);

            return () => clearInterval(timer);
        }
    }, [secondaryValue, min]);

    const generateArcs = () => {
        // Function to create an SVG arc path
        const createArc = (value: number, radius: number, thickness: number) => {
            const angle = startAngle + ((value - min) / (max - min)) * (endAngle - startAngle);
            const arcStart = startAngle * (Math.PI / 180);
            const arcEnd = angle * (Math.PI / 180);

            const innerRadius = radius - thickness;
            const outerRadius = radius;

            const startOuterX = cx + outerRadius * Math.cos(arcStart);
            const startOuterY = cy + outerRadius * Math.sin(arcStart);
            const endOuterX = cx + outerRadius * Math.cos(arcEnd);
            const endOuterY = cy + outerRadius * Math.sin(arcEnd);

            const startInnerX = cx + innerRadius * Math.cos(arcEnd);
            const startInnerY = cy + innerRadius * Math.sin(arcEnd);
            const endInnerX = cx + innerRadius * Math.cos(arcStart);
            const endInnerY = cy + innerRadius * Math.sin(arcStart);

            const largeArcFlag = angle - startAngle <= 180 ? 0 : 1;

            return `M ${startOuterX} ${startOuterY}
                    A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${endOuterX} ${endOuterY}
                    L ${startInnerX} ${startInnerY}
                    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${endInnerX} ${endInnerY}
                    Z`;
        };

        return (
            <g>
                {/* Background arc */}
                <path
                    d={createArc(max, radius, 12)}
                    fill="#F3F4F6"
                    className="transition-all duration-300"
                />

                {/* Primary value arc */}
                <path
                    d={createArc(animatedPrimaryValue, radius, 12)}
                    fill={primaryColor}
                    className="transition-all duration-300"
                />

                {/* Secondary value arc (if exists) */}
                {secondaryValue !== null && (
                    <path
                        d={createArc(animatedSecondaryValue, radius - 14, 12)}
                        fill={secondaryColor}
                        className="transition-all duration-300"
                    />
                )}
            </g>
        );
    };

    return (
        <div className="flex flex-col items-center w-64">
            <div className="relative mb-4">
                <svg width="200" height="140" viewBox="0 0 200 140">
                    {generateArcs()}

                    <text
                        x={cx}
                        y={cy - 5}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="font-medium"
                    >
                        <tspan style={{ fill: primaryColor }} className="text-3xl">
                            {primaryValue}
                        </tspan>
                        {secondaryValue !== null && (
                            <>
                                <tspan className="text-3xl">/</tspan>
                                <tspan style={{ fill: secondaryColor }} className="text-3xl">
                                    {secondaryValue}
                                </tspan>
                            </>
                        )}
                    </text>

                    {unit && (
                        <text
                            x={cx}
                            y={cy + 25}
                            textAnchor="middle"
                            className="text-sm text-gray-500"
                        >
                            {unit}
                        </text>
                    )}

                    <text
                        x="40"
                        y="120"
                        className="text-sm fill-gray-500"
                        textAnchor="middle"
                    >
                        {min}
                    </text>

                    <text
                        x="160"
                        y="120"
                        className="text-sm fill-gray-500"
                        textAnchor="middle"
                    >
                        {max}
                    </text>
                </svg>
            </div>

            <div className="text-center">
                <div className="inline-block px-6 py-1.5 rounded-full border border-gray-200 text-sm text-gray-700">
                    {title}
                </div>
                {subtitle && (
                    <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
                )}
            </div>
        </div>
    );
};

export default GaugeChart;