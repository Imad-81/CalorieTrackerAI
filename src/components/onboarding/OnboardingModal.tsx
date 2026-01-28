import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

export const OnboardingModal = () => {
    const { user, updateProfile, calculateTDEE } = useStore();
    const [step, setStep] = useState(0);
    const [isVisible, setIsVisible] = useState(user.name === 'Guest'); // Simple check

    if (!isVisible) return null;

    const handleNext = () => {
        if (step === 3) {
            calculateTDEE();
            setIsVisible(false); // Close
        } else {
            setStep(s => s + 1);
        }
    };

    const steps = [
        {
            title: "Welcome to CUT.",
            subtitle: "Precision nutrition for high performance. Let's calibrate your engine.",
            content: (
                <div className="space-y-4">
                    <label className="block text-sm font-bold uppercase text-zinc-500">Call Sign (Name)</label>
                    <Input
                        value={user.name === 'Guest' ? '' : user.name}
                        onChange={(e) => updateProfile({ name: e.target.value })}
                        placeholder="e.g. Maverick"
                        autoFocus
                    />
                </div>
            )
        },
        {
            title: "Metrics",
            subtitle: "We need your biological data for accurate TDEE calculation.",
            content: (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold uppercase text-zinc-500 mb-1">Age</label>
                            <Input type="number" value={user.age} onChange={(e) => updateProfile({ age: parseInt(e.target.value) || 0 })} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold uppercase text-zinc-500 mb-1">Height (cm)</label>
                            <Input type="number" value={user.height} onChange={(e) => updateProfile({ height: parseInt(e.target.value) || 0 })} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold uppercase text-zinc-500 mb-1">Current Weight (kg)</label>
                        <Input type="number" value={user.weight} onChange={(e) => updateProfile({ weight: parseInt(e.target.value) || 0 })} />
                    </div>
                </div>
            )
        },
        {
            title: "Mission Objective",
            subtitle: "What is your current directive?",
            content: (
                <div className="grid grid-cols-1 gap-3">
                    {['cut', 'maintain', 'bulk'].map((goal) => (
                        <button
                            key={goal}
                            onClick={() => updateProfile({ goal: goal as any })}
                            className={`p-4 rounded-lg border text-left transition-all ${user.goal === goal ? 'bg-electric-lime text-black border-electric-lime font-bold' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}
                        >
                            <div className="uppercase tracking-widest text-sm">{goal}</div>
                        </button>
                    ))}
                </div>
            )
        },
        {
            title: "Activity Level",
            subtitle: "How active are you on a daily basis?",
            content: (
                <div className="grid grid-cols-1 gap-2">
                    {['sedentary', 'moderate', 'athlete'].map((level) => (
                        <button
                            key={level}
                            onClick={() => updateProfile({ activityLevel: level as any })}
                            className={`p-3 rounded-lg border text-left transition-all ${user.activityLevel === level ? 'bg-white text-black border-white font-bold' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}
                        >
                            <div className="uppercase tracking-widest text-xs">{level}</div>
                        </button>
                    ))}
                </div>
            )
        },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
            <Card className="w-full max-w-lg p-8 bg-zinc-950 border-zinc-900 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-zinc-900">
                    <motion.div
                        className="h-full bg-electric-lime"
                        animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                    />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6 mt-4"
                    >
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black uppercase italic tracking-tighter">{steps[step].title}</h2>
                            <p className="text-zinc-500">{steps[step].subtitle}</p>
                        </div>

                        {steps[step].content}
                    </motion.div>
                </AnimatePresence>

                <div className="mt-8 flex justify-end">
                    <Button onClick={handleNext} className="w-full md:w-auto">
                        {step === steps.length - 1 ? 'Initialize System' : 'Next'}
                    </Button>
                </div>
            </Card>
        </div>
    );
};
