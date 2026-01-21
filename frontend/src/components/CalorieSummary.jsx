/**
 * CalorieSummary component
 * Displays daily calorie summary with progress bar
 */
export const CalorieSummary = ({ consumed, goal }) => {
    const percentage = Math.min((consumed / goal) * 100, 100);
    const remaining = Math.max(goal - consumed, 0);

    // Determine color based on progress
    const getProgressColor = () => {
        if (percentage < 50) return 'bg-green-500';
        if (percentage < 80) return 'bg-yellow-500';
        if (percentage < 100) return 'bg-orange-500';
        return 'bg-red-500';
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Calories</h2>

            {/* Calorie Numbers */}
            <div className="flex items-end justify-between mb-4">
                <div>
                    <p className="text-4xl font-bold text-gray-900">{consumed}</p>
                    <p className="text-sm text-gray-600">of {goal} cal</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-semibold text-primary-600">{remaining}</p>
                    <p className="text-sm text-gray-600">remaining</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                    className={`h-full ${getProgressColor()} transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            {/* Progress Percentage */}
            <p className="text-center text-sm text-gray-600 mt-2">
                {percentage.toFixed(0)}% of daily goal
            </p>
        </div>
    );
};
