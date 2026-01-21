import { useMeals } from '../hooks/useMeals';
import { CalorieSummary } from '../components/CalorieSummary';
import { MealCard } from '../components/MealCard';
import { Loader } from '../components/Loader';
import { getDailyGoal } from '../services/calorieService';
import { Link } from 'react-router-dom';

/**
 * Dashboard Page
 * Shows today's calorie summary and meal breakdown
 */
export const Dashboard = () => {
    const { getTodayMeals, getTodayCalories, getTodayCaloriesByMealType, loading } = useMeals();

    const todayMeals = getTodayMeals();
    const todayCalories = getTodayCalories();
    const caloriesByMealType = getTodayCaloriesByMealType();
    const dailyGoal = getDailyGoal();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader size="large" text="Loading your meals..." />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Track your daily calorie intake</p>
            </div>

            {/* Calorie Summary */}
            <div className="mb-6">
                <CalorieSummary consumed={todayCalories} goal={dailyGoal} />
            </div>

            {/* Meal Type Breakdown */}
            {Object.keys(caloriesByMealType).length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Breakdown by Meal</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(caloriesByMealType).map(([mealType, calories]) => (
                            <div key={mealType} className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm text-gray-600 mb-1">{mealType}</p>
                                <p className="text-2xl font-bold text-gray-900">{calories}</p>
                                <p className="text-xs text-gray-500">calories</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Today's Meals */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Today's Meals</h2>
                    <Link to="/add-meal" className="text-primary-600 text-sm font-medium hover:text-primary-700">
                        + Add Meal
                    </Link>
                </div>

                {todayMeals.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                        <div className="mb-4">
                            <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No meals logged yet</h3>
                        <p className="text-gray-600 mb-4">Start tracking your calories by adding your first meal!</p>
                        <Link
                            to="/add-meal"
                            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-all duration-200 ease-in-out"
                        >
                            Add Your First Meal
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {todayMeals.map((meal) => (
                            <MealCard key={meal.id} meal={meal} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
