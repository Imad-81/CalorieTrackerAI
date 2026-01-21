import { useState } from 'react';
import { useMeals } from '../hooks/useMeals';
import { MealCard } from '../components/MealCard';
import { Loader } from '../components/Loader';
import { groupMealsByDate, getRelativeDateLabel } from '../utils/dateUtils';

/**
 * History Page
 * Shows all previous meals grouped by date
 */
export const History = () => {
    const { meals, loading } = useMeals();
    const [expandedDates, setExpandedDates] = useState(new Set());

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader size="large" text="Loading your history..." />
            </div>
        );
    }

    // Group meals by date
    const mealsByDate = groupMealsByDate(meals);
    const dates = Object.keys(mealsByDate).sort((a, b) => new Date(b) - new Date(a));

    const toggleDate = (date) => {
        const newExpanded = new Set(expandedDates);
        if (newExpanded.has(date)) {
            newExpanded.delete(date);
        } else {
            newExpanded.add(date);
        }
        setExpandedDates(newExpanded);
    };

    const getDayTotal = (date) => {
        return mealsByDate[date].reduce((total, meal) => total + (meal.calories || 0), 0);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">History</h1>
                <p className="text-gray-600">View your meal history and calorie tracking</p>
            </div>

            {/* History List */}
            {dates.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                    <div className="mb-4">
                        <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No history yet</h3>
                    <p className="text-gray-600">Start adding meals to see your history here</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {dates.map((date) => {
                        const isExpanded = expandedDates.has(date);
                        const dayMeals = mealsByDate[date];
                        const dayTotal = getDayTotal(date);

                        return (
                            <div key={date} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                {/* Date Header - Clickable */}
                                <button
                                    onClick={() => toggleDate(date)}
                                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-all duration-200 ease-in-out"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary-100 text-primary-700 w-12 h-12 rounded-full flex items-center justify-center font-bold">
                                            {dayMeals.length}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-gray-900">{getRelativeDateLabel(date)}</h3>
                                            <p className="text-sm text-gray-600">{dayMeals.length} meal{dayMeals.length !== 1 ? 's' : ''}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-primary-600">{dayTotal}</p>
                                            <p className="text-xs text-gray-500">calories</p>
                                        </div>

                                        {/* Expand/Collapse Icon */}
                                        <svg
                                            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                {/* Expandable Meals List */}
                                {isExpanded && (
                                    <div className="px-6 pb-4 space-y-3 border-t border-gray-100 pt-4">
                                        {dayMeals.map((meal) => (
                                            <MealCard key={meal.id} meal={meal} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
