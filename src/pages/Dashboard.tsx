
import { useStore } from '../store/useStore';
import { ProgressRing } from '../components/dashboard/ProgressRing';
import { MacroHud } from '../components/dashboard/MacroHud';
import { AICapture } from '../components/dashboard/AICapture';
import { motion } from 'framer-motion';

export const Dashboard = () => {
    const { user, dailyLog, logFood } = useStore();

    const handleLog = (text: string) => {
        // Mock NLP parsing based on text input
        // In a real app, this would call an API
        console.log("Analyzing:", text);

        // Simple mock logic
        const isBig = text.toLowerCase().includes('chicken') || text.toLowerCase().includes('steak');
        const calories = isBig ? 650 : 300;

        logFood({
            name: text,
            calories: calories,
            protein: isBig ? 50 : 10,
            carbs: 40,
            fats: 15
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] gap-10">
            {/* Progress Section */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-8 w-full"
            >
                <ProgressRing
                    caloriesIn={dailyLog.caloriesIn}
                    tdee={user.tdee}
                />

                <MacroHud
                    protein={{ current: dailyLog.protein, total: 200 }} // Mock targets for now
                    carbs={{ current: dailyLog.carbs, total: 250 }}
                    fats={{ current: dailyLog.fats, total: 70 }}
                />
            </motion.div>

            {/* Capture Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="w-full"
            >
                <AICapture onLog={handleLog} />
            </motion.div>
        </div>
    );
};
