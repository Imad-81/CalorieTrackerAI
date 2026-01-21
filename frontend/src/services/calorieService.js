/**
 * Mock AI service for calorie calculation
 * Simulates an AI backend that analyzes food images and portion descriptions
 */

// Common food items with base calorie values (per standard serving)
const FOOD_DATABASE = {
    pizza: { name: 'Pizza', baseCalories: 285, unit: 'slice' },
    burger: { name: 'Burger', baseCalories: 540, unit: 'burger' },
    salad: { name: 'Salad', baseCalories: 150, unit: 'bowl' },
    rice: { name: 'Rice', baseCalories: 206, unit: 'cup' },
    chicken: { name: 'Chicken Breast', baseCalories: 165, unit: 'piece' },
    pasta: { name: 'Pasta', baseCalories: 220, unit: 'plate' },
    sandwich: { name: 'Sandwich', baseCalories: 320, unit: 'sandwich' },
    apple: { name: 'Apple', baseCalories: 95, unit: 'apple' },
    banana: { name: 'Banana', baseCalories: 105, unit: 'banana' },
    eggs: { name: 'Eggs', baseCalories: 155, unit: '2 eggs' },
    toast: { name: 'Toast', baseCalories: 80, unit: 'slice' },
    coffee: { name: 'Coffee', baseCalories: 5, unit: 'cup' },
    juice: { name: 'Orange Juice', baseCalories: 110, unit: 'glass' },
    yogurt: { name: 'Yogurt', baseCalories: 150, unit: 'cup' },
    oatmeal: { name: 'Oatmeal', baseCalories: 150, unit: 'bowl' },
};

/**
 * Simulate AI processing delay
 * @param {number} ms - Milliseconds to delay
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Parse portion description to estimate multiplier
 * @param {string} portionText - User's portion description
 * @returns {number} Portion multiplier
 */
const parsePortionMultiplier = (portionText) => {
    const text = portionText.toLowerCase();

    // Check for specific quantities
    if (text.match(/\b(half|1\/2)\b/)) return 0.5;
    if (text.match(/\b(quarter|1\/4)\b/)) return 0.25;
    if (text.match(/\b(2|two)\b/)) return 2;
    if (text.match(/\b(3|three)\b/)) return 3;
    if (text.match(/\b(small|little)\b/)) return 0.7;
    if (text.match(/\b(large|big|huge)\b/)) return 1.5;
    if (text.match(/\b(full|whole|entire)\b/)) return 1;

    // Default to 1 serving
    return 1;
};

/**
 * Calculate calories based on image and portion description
 * This is a MOCK function - in production, this would call a real AI API
 * 
 * @param {File} imageFile - The food image file
 * @param {string} portionText - User's description of portion size
 * @returns {Promise<Object>} Calorie calculation result
 */
export const calculateCalories = async (imageFile, portionText) => {
    // Simulate API processing time (1.5-2.5 seconds)
    const processingTime = 1500 + Math.random() * 1000;
    await delay(processingTime);

    // Randomly select a food item (in real app, AI would identify from image)
    const foodKeys = Object.keys(FOOD_DATABASE);
    const randomFood = FOOD_DATABASE[foodKeys[Math.floor(Math.random() * foodKeys.length)]];

    // Calculate portion multiplier from description
    const portionMultiplier = parsePortionMultiplier(portionText);

    // Calculate final calories
    const baseCalories = randomFood.baseCalories;
    const adjustedCalories = Math.round(baseCalories * portionMultiplier);

    // Add some randomness to make it feel more realistic (±10%)
    const variance = 0.9 + Math.random() * 0.2;
    const finalCalories = Math.round(adjustedCalories * variance);

    return {
        foodName: randomFood.name,
        baseCalories,
        portionMultiplier,
        adjustedCalories: finalCalories,
        confidence: 0.85 + Math.random() * 0.15, // 85-100% confidence
        unit: randomFood.unit,
    };
};

/**
 * Get daily calorie goal (mock - in real app, this would be user-configurable)
 * @returns {number} Daily calorie goal
 */
export const getDailyGoal = () => {
    return 2000; // Standard 2000 calorie goal
};
