/**
 * MealCard component
 * Displays a single meal with image, type, calories, and portion info
 */
export const MealCard = ({ meal }) => {
    // Meal type colors
    const mealTypeColors = {
        Breakfast: 'bg-yellow-100 text-yellow-800',
        Lunch: 'bg-green-100 text-green-800',
        Dinner: 'bg-blue-100 text-blue-800',
        Snack: 'bg-purple-100 text-purple-800',
    };

    const colorClass = mealTypeColors[meal.mealType] || 'bg-gray-100 text-gray-800';

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200 ease-in-out">
            <div className="flex gap-4">
                {/* Meal Image */}
                <div className="flex-shrink-0">
                    <img
                        src={meal.imageUrl}
                        alt={meal.foodName}
                        className="w-20 h-20 object-cover rounded-lg"
                    />
                </div>

                {/* Meal Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 truncate">{meal.foodName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${colorClass}`}>
                            {meal.mealType}
                        </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{meal.portionDescription}</p>

                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary-600">{meal.calories} cal</span>
                        <span className="text-xs text-gray-500">
                            {new Date(meal.timestamp).toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: '2-digit'
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
