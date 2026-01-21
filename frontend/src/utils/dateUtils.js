/**
 * Date utility functions for formatting and grouping meals by date
 */

/**
 * Format a date to a readable string (e.g., "Jan 21, 2026")
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

/**
 * Get today's date in YYYY-MM-DD format
 * @returns {string} Today's date
 */
export const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

/**
 * Check if a date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
    const d = new Date(date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
};

/**
 * Group meals by date
 * @param {Array} meals - Array of meal objects
 * @returns {Object} Meals grouped by date
 */
export const groupMealsByDate = (meals) => {
    return meals.reduce((groups, meal) => {
        const date = meal.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(meal);
        return groups;
    }, {});
};

/**
 * Get relative date label (Today, Yesterday, or formatted date)
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {string} Relative date label
 */
export const getRelativeDateLabel = (date) => {
    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (d.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (d.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        return formatDate(date);
    }
};
