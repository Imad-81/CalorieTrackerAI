import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card'; // Assuming Card exists in valid path
import { cn } from '../../lib/utils';

interface MacroHudProps {
    protein: { current: number; total: number };
    carbs: { current: number; total: number };
    fats: { current: number; total: number };
}

export const MacroHud: React.FC<MacroHudProps> = ({ protein, carbs, fats }) => {
    const macros = [
        { label: 'Protein', data: protein, color: 'bg-white', text: 'text-white' }, // Highlighted/Boldest
        { label: 'Carbs', data: carbs, color: 'bg-zinc-600', text: 'text-zinc-400' },
        { label: 'Fats', data: fats, color: 'bg-zinc-700', text: 'text-zinc-500' },
    ];

    return (
        <Card className="w-full max-w-md p-6 border-white/5 bg-black/20 backdrop-blur-md">
            <div className="flex flex-col gap-6">
                {macros.map((macro, index) => {
                    const percentage = Math.min((macro.data.current / macro.data.total) * 100, 100);
                    return (
                        <div key={macro.label} className="w-full">
                            <div className="flex justify-between items-end mb-2">
                                <span className={cn("text-sm font-bold uppercase tracking-wider", macro.text)}>
                                    {macro.label}
                                </span>
                                <div className="text-right font-mono text-xs">
                                    <span className={cn("text-lg font-bold", macro.text)}>
                                        {macro.data.current}
                                    </span>
                                    <span className="text-zinc-600"> / {macro.data.total}g</span>
                                </div>
                            </div>

                            {/* Bar Container */}
                            <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                                <motion.div
                                    className={cn("h-full rounded-full", macro.color)}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};
