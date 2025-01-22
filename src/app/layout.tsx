// app/layout.tsx
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Sidebar from '@/components/SideBar';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: 'Network Dashboard',
    description: 'Network monitoring and prediction dashboard',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={`${plusJakartaSans.className} bg-gradient-to-b from-blue-100 via-blue-300 to-blue-600`}>
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-2 mt-7">
                {children}
            </main>
        </div>
        </body>
        </html>
    );
}