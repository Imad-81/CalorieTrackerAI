import { useState, useEffect } from 'react';
import { getMeals, saveMeals } from '../utils/storage';
import { getTodayDate } from '../utils/dateUtils';

/**
 * Custom hook for managing meals state
 * Handles loading, adding, and persisting meals to localStorage
 */
export const useMeals = () => {
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load meals from localStorage on mount
    useEffect(() => {
        const loadedMeals = getMeals();
        setMeals(loadedMeals);
        setLoading(false);
    }, []);

    // Add a new meal
    const addMeal = (meal) => {
        const newMeal = {
            id: Date.now().toString(), // Simple ID generation
            date: getTodayDate(),
            timestamp: new Date().toISOString(),
            ...meal,
        };

        const updatedMeals = [...meals, newMeal];
        setMeals(updatedMeals);
        saveMeals(updatedMeals);

        return newMeal;
    };

    // Get meals for today
    const getTodayMeals = () => {
        const today = getTodayDate();
        return meals.filter(meal => meal.date === today);
    };

    // Get total calories for today
    const getTodayCalories = () => {
        return getTodayMeals().reduce((total, meal) => total + (meal.calories || 0), 0);
    };

    // Get calories by meal type for today
    const getTodayCaloriesByMealType = () => {
        const todayMeals = getTodayMeals();
        return todayMeals.reduce((acc, meal) => {
            const type = meal.mealType || 'Other';
            acc[type] = (acc[type] || 0) + (meal.calories || 0);
            return acc;
        }, {});
    };

    return {
        meals,
        loading,
        addMeal,
        getTodayMeals,
        getTodayCalories,
        getTodayCaloriesByMealType,
    };
};
