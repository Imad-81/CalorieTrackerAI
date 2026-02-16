import type { Metadata } from 'next';
import './globals.css';
import { OnboardingModal } from '@/components/onboarding/OnboardingModal';

export const metadata: Metadata = {
    title: 'CUT — Calorie Tracker',
    description: 'The calorie tracker for those who demand precision. Capture via AI. Analyze. Execute.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <OnboardingModal />
                <div className="min-h-screen bg-obsidian text-crisp-white font-sans selection:bg-electric-lime selection:text-obsidian">
                    {children}
                </div>
            </body>
        </html>
    );
}
