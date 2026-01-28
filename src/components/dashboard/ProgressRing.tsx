import { motion } from 'framer-motion';

interface ProgressRingProps {
    caloriesIn: number;
    tdee: number;
    size?: number;
    strokeWidth?: number;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
    caloriesIn,
    tdee,
    size = 280,
    strokeWidth = 20
}) => {
    const radius = size / 2 - strokeWidth;
    const circumference = 2 * Math.PI * radius;

    // Calculate percentage, capped at 100 for proper filling, but we handle overages via color
    const rawPercentage = (caloriesIn / tdee) * 100;
    const isOver = rawPercentage > 100;
    const percentage = Math.min(rawPercentage, 100);
    const offset = circumference - (percentage / 100) * circumference;

    const caloriesLeft = tdee - caloriesIn;
    const displayCalories = Math.abs(caloriesLeft);

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            {/* Background Circle */}
            <svg width={size} height={size} className="transform -rotate-90 text-zinc-900">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
            </svg>

            {/* Progress Circle */}
            <svg width={size} height={size} className="absolute inset-0 transform -rotate-90">
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={isOver ? '#EF4444' : '#CCFF00'} // Red-500 or Electric Lime
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_10px_rgba(204,255,0,0.3)]"
                    style={{ stroke: isOver ? '#EF4444' : '#CCFF00' }}
                />
            </svg>

            {/* Center Content */}
            <div className="absolute flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <span className="text-zinc-500 font-bold tracking-widest text-xs uppercase mb-1">
                        {isOver ? 'Over Limit' : 'Remaining'}
                    </span>
                    <h1 className="text-6xl md:text-7xl font-mono font-black tracking-tighter text-white tabular-nums leading-none">
                        {displayCalories.toLocaleString()}
                    </h1>
                    <span className="text-zinc-500 font-medium text-sm mt-2">
                        Target: <span className="text-zinc-300">{tdee}</span>
                    </span>
                </motion.div>
            </div>
        </div>
    );
};
