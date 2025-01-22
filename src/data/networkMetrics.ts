export interface Metric {
    label: string;
    value: string;
    unit: string;
    color: string;
}

export const networkMetrics: Metric[] = [
    {
        label: 'BER',
        value: '1.3',
        unit: '%',
        color: 'bg-[#16325A]'
    },
    {
        label: 'RTT',
        value: '150',
        unit: 'mSec',
        color: 'bg-[#316B9D]'
    },
    {
        label: 'Throughput',
        value: '3.45',
        unit: 'GB/Min',
        color: 'bg-[#54B7E5]'
    },
    {
        label: 'Availability',
        value: '99.4',
        unit: '%',
        color: 'bg-[#6CDCB2]'
    },
    {
        label: 'Latency',
        value: '4.001',
        unit: 'mSec',
        color: 'bg-[#64D583]'
    },
    {
        label: 'Jitter',
        value: '0.2001',
        unit: 'mSec',
        color: 'bg-[#49C86C]'
    }
];