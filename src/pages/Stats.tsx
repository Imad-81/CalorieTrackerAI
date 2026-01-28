
import { StatsGraph } from '../components/dashboard/StatsGraph';
import { Card } from '../components/ui/Card';
import { ArrowDownRight } from 'lucide-react';

export const Stats = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col gap-2">
                <h1 className="text-4xl font-black uppercase tracking-tighter">Analytics</h1>
                <p className="text-zinc-500 font-medium">Correlation between intake and composition.</p>
            </header>

            {/* Weekly Delta Card */}
            <Card className="p-6 bg-gradient-to-br from-zinc-900 to-black border-white/5 relative overflow-hidden group">
                <div className="absolute right-0 top-0 w-64 h-64 bg-electric-lime/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-electric-lime/10 transition-colors duration-500" />

                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">Weekly Average Deficit</div>
                        <div className="text-3xl font-mono font-bold text-white">-7,700 <span className="text-electric-lime text-base">kcal</span></div>
                    </div>
                    <div className="flex items-center gap-2 text-electric-lime bg-electric-lime/10 px-4 py-2 rounded-full border border-electric-lime/20">
                        <ArrowDownRight className="w-5 h-5" />
                        <span className="font-bold font-mono">1.0 kg</span>
                    </div>
                </div>
            </Card>

            {/* Main Graph */}
            <Card className="p-6 h-[500px] flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg">Weight vs. Intake</h2>
                    <div className="flex gap-4 text-xs font-bold uppercase">
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white" /> Weight</div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-electric-lime" /> Calories</div>
                    </div>
                </div>
                <div className="flex-1 min-h-0">
                    <StatsGraph />
                </div>
            </Card>
        </div>
    );
};
