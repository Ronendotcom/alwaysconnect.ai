"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wifi, PieChart, Mail } from "lucide-react";

const Sidebar = () => {
    const pathname = usePathname();
    const PredictorIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <circle cx="50" cy="50" r="5" fill="currentColor" />
            <circle cx="30" cy="30" r="4" fill="currentColor" />
            <circle cx="70" cy="30" r="4" fill="currentColor" />
            <circle cx="30" cy="70" r="4" fill="currentColor" />
            <circle cx="70" cy="70" r="4" fill="currentColor" />
            <line x1="50" y1="50" x2="30" y2="30" stroke="currentColor" />
            <line x1="50" y1="50" x2="70" y2="30" stroke="currentColor" />
            <line x1="50" y1="50" x2="30" y2="70" stroke="currentColor" />
            <line x1="50" y1="50" x2="70" y2="70" stroke="currentColor" />
            <circle cx="50" cy="10" r="3" fill="currentColor" />
            <circle cx="90" cy="50" r="3" fill="currentColor" />
            <circle cx="50" cy="90" r="3" fill="currentColor" />
            <circle cx="10" cy="50" r="3" fill="currentColor" />
            <line x1="50" y1="50" x2="50" y2="10" stroke="currentColor" />
            <line x1="50" y1="50" x2="90" y2="50" stroke="currentColor" />
            <line x1="50" y1="50" x2="50" y2="90" stroke="currentColor" />
            <line x1="50" y1="50" x2="10" y2="50" stroke="currentColor" />
        </svg>
    );

    const navItems = [
        {
            name: "AlwaysConnect PoC Results",
            href: "/network-kpis",
            icon: PieChart,
        },
        {
            name: "Predictor",
            href: "/predictor",
            icon: PredictorIcon,
        },
        {
            name: "Results Mail",
            href: "/share",
            icon: Mail,
        },
    ];

    return (
        <nav className="relative h-screen w-[100px] flex flex-col items-center  overflow-y-auto">
            {/* Logo Section */}
            <div className="w-full pt-8 pb-16">
                <div className="w-8 h-8 relative mx-auto">
                    <Wifi size={32} className="text-blue-600 absolute" />
                </div>
            </div>

            {/* Curved Navigation Container */}
            <div className="flex-1 w-full relative flex flex-col items-center">
                {/* Background curve */}
                <div className="absolute top-0 left-0 right-0 h-1/2 rounded-tr-full rounded-br-full bg-white shadow-md"></div>

                <div className="relative flex flex-col gap-8 items-center pt-16 px-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex flex-col items-center group w-full"
                            >
                                <div
                                    className={`flex flex-col items-center gap-2 ${
                                        isActive ? "text-blue-600" : "text-gray-400"
                                    }`}
                                >
                                    <Icon />
                                    <span
                                        className={`text-xs text-center whitespace-pre-line px-2 ${
                                            isActive ? "text-blue-600 font-medium" : "text-gray-500"
                                        }`}
                                        style={{
                                            overflowWrap: "break-word",
                                            wordWrap: "break-word",
                                            wordBreak: "break-word",
                                            whiteSpace: "normal",
                                        }}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Sidebar;
