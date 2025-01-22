"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GaugeChart from "@/components/GaugeChart";
import NetworkMetrics, {MetricItem} from "@/components/NetworkMetrics";
import ImprovementMetrics from "@/components/ImprovementMetrics";
import CustomButton from "@/components/ui/Button";
import Link from "next/link";

const Predictor = () => {
    const [showMetrics, setShowMetrics] = useState(false);
    const [deploymentStatus, setDeploymentStatus] = useState<'before' | 'after'>('after');

    const beforeMetrics: MetricItem[] = [
        { label: 'BER', value: '1.2', unit: '%', color: 'bg-[#1E40AF]' },
        { label: 'RTT', value: '120', unit: 'mSec', color: 'bg-[#1E3A8A]' },
        { label: 'Throughput', value: '3', unit: 'GB/Min', color: 'bg-[#1E4D8A]' },
        { label: 'Availability', value: '99.2', unit: '%', color: 'bg-[#0F766E]' },
        { label: 'Latency', value: '4', unit: 'mSec', color: 'bg-[#0D6B63]' },
        { label: 'Jitter', value: '0.2', unit: 'mSec', color: 'bg-[#047857]' }
    ];

    const afterMetrics: MetricItem[] = [
        {
            label: 'BER',
            value: '1.3',
            unit: '%',
            color: 'bg-[#1E40AF]',
            change: {
                value: '+0.1',
                direction: 'up',
            },
        },
        {
            label: 'RTT',
            value: '150',
            unit: 'mSec',
            color: 'bg-[#1E3A8A]',
            change: {
                value: '+30',
                direction: 'up',
            },
        },
        {
            label: 'Throughput',
            value: '3.45',
            unit: 'GB/Min',
            color: 'bg-[#1E4D8A]',
            change: {
                value: '+0.45',
                direction: 'up',
            },
            improvement: {
                value: '15%',
                label: 'Gain',
            },
        },
        {
            label: 'Availability',
            value: '99.5',
            unit: '%',
            color: 'bg-[#0F766E]',
            change: {
                value: '+0.3',
                direction: 'up',
            },
            improvement: {
                value: '25%',
                label: 'Unavailability Reduction',
            },
        },
        {
            label: 'Latency',
            value: '4.001',
            unit: 'mSec',
            color: 'bg-[#0D6B63]',
            change: {
                value: '+0.001',
                direction: 'up',
            },
        },
        {
            label: 'Jitter',
            value: '0.2001',
            unit: 'mSec',
            color: 'bg-[#047857]',
            change: {
                value: '+0.001',
                direction: 'up',
            },
        },
    ];

    const venueImprovementStats = [
        { label: 'Video', value: '+20%', color: 'bg-[#2E5C8A]' },
        { label: 'RTT', value: '+30%', color: 'bg-[#2E5C8A]' },
        { label: 'Throughput', value: '+40%', color: 'bg-[#2E5C8A]' }
    ];

    const gaugeConfigs = [
        { value: 3.1, min: 1.2, max: 5.0, title: "Average number of CELLS covering the UE", color: "#54B7E5" },
        { value: 99.2, min: 95, max: 99.99, title: "Network Availability", unit: "%", color: "#6CDCB2" },
        { value: 1.2, min: 0.1, max: 2.5, title: "Average BER (BLER)", unit: "%", color: "#16325A" },
        { value: "120/80", min: 40, max: 300, title: "RTT (4G/5G)", unit: "mSEc", color: "#2C5784" },
        { value: 3, min: 1, max: 12, title: "Throughput for one UE (Peak throughput) per cell", unit: "G/min", color: "#54B7E5" },
        { value: 300, min: 100, max: 1000, title: "Latency (one way)", unit: "Micro Sec", color: "#64D583" },
        { value: "120/80", min: 40, max: 300, title: "Jitter", unit: "mSEc", color: "#64D583" }
    ];

    const handleRunTest = () => {
        setDeploymentStatus('after');
    };

    const handleReset = () => {
        setDeploymentStatus('before');
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="p-8 max-w-[1600px] mx-auto min-h-screen">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
                <AnimatePresence mode="wait">
                    {!showMetrics ? (
                        <motion.div
                            key="overview"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h1 className="text-3xl font-bold text-[#2E5C8A] mb-8">
                                Your Network Inputs
                            </h1>
                            <motion.div
                                variants={contentVariants}
                                className="grid grid-cols-2 gap-8 lg:grid-cols-4 mb-8"
                            >
                                {gaugeConfigs.map((gauge, index) => (
                                    <motion.div key={index} variants={itemVariants}>
                                        <GaugeChart {...gauge} />
                                    </motion.div>
                                ))}
                            </motion.div>
                            <motion.div
                                variants={itemVariants}
                                className="flex justify-center gap-4"
                            >
                                <CustomButton variant="reset">Reset All</CustomButton>
                                <CustomButton
                                    variant="runTest"
                                    onClick={() => setShowMetrics(true)}
                                >
                                    Always Connect
                                </CustomButton>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <h1 className="text-3xl font-bold text-[#2E5C8A] mb-8">
                                AlwaysConnect PoC Results
                            </h1>

                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_auto_1fr] gap-12">
                                <div>
                                    <NetworkMetrics
                                        metrics={beforeMetrics}
                                        title="Before SDK deployed"
                                        titleColor={deploymentStatus === 'before' ? 'text-[#2E5C8A]' : 'text-[#FF4B26]'}
                                    />
                                </div>

                                <AnimatePresence mode="wait">
                                    {deploymentStatus === 'after' && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            <NetworkMetrics
                                                metrics={afterMetrics}
                                                title="After SDK deployed"
                                                titleColor="text-[#4CAF50]"
                                                showChanges={true}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {deploymentStatus === 'after' && (
                                    <div className="flex self-center pt-16">
                                        <CustomButton variant="tco">
                                            TCO Model
                                        </CustomButton>
                                    </div>
                                )}

                                <AnimatePresence mode="wait">
                                    {deploymentStatus === 'after' && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            <ImprovementMetrics
                                                stats={venueImprovementStats}
                                                title="Venue Improvement Stats"
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
                                <CustomButton
                                    variant="reset"
                                    onClick={handleReset}
                                >
                                    Reset
                                </CustomButton>
                                <CustomButton
                                    variant="runTest"
                                    onClick={handleRunTest}
                                    isTestRunning={deploymentStatus === 'after'}
                                >
                                    {deploymentStatus === 'after' ? 'AlwaysConnect' : 'Run SDK Test'}
                                </CustomButton>
                                {deploymentStatus === 'after' && (
                                    <Link href="/share">
                                        <CustomButton variant="share">
                                            Share
                                        </CustomButton>
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Predictor;