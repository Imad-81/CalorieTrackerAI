/**
 * Storage utility for managing localStorage operations
 * Handles saving and retrieving meal data with error handling
 */

const STORAGE_KEY = 'calorie_tracker_meals';

/**
 * Get all meals from localStorage
 * @returns {Array} Array of meal objects
 */
export const getMeals = () => {
    try {
        const meals = localStorage.getItem(STORAGE_KEY);
        return meals ? JSON.parse(meals) : [];
    } catch (error) {
        console.error('Error reading meals from storage:', error);
        return [];
    }
};

/**
 * Save meals to localStorage
 * @param {Array} meals - Array of meal objects to save
 */
export const saveMeals = (meals) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(meals));
    } catch (error) {
        console.error('Error saving meals to storage:', error);
    }
};

/**
 * Add a new meal to storage
 * @param {Object} meal - Meal object to add
 */
export const addMeal = (meal) => {
    const meals = getMeals();
    meals.push(meal);
    saveMeals(meals);
};

/**
 * Clear all meals from storage
 */
export const clearMeals = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing meals from storage:', error);
    }
};
