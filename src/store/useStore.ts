import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfile {
    name: string;
    age: number;
    height: number; // cm
    weight: number; // kg
    goalWeight: number; // kg
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'athlete';
    goal: 'cut' | 'maintain' | 'bulk';
    tdee: number;
}

interface DailyLog {
    caloriesIn: number;
    protein: number;
    carbs: number;
    fats: number;
    history: Array<{
        id: string;
        name: string;
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
        timestamp: number;
    }>;
}

interface AppState {
    user: UserProfile;
    dailyLog: DailyLog;
    ui: {
        modalOpen: boolean;
        activeTab: string;
    };

    // Actions
    updateProfile: (profile: Partial<UserProfile>) => void;
    calculateTDEE: () => void;
    logFood: (food: { name: string; calories: number; protein: number; carbs: number; fats: number }) => void;
    resetDay: () => void;
    setModalOpen: (isOpen: boolean) => void;
    setActiveTab: (tab: string) => void;
}

const DEFAULT_USER: UserProfile = {
    name: 'Guest',
    age: 25,
    height: 175,
    weight: 75,
    goalWeight: 70,
    activityLevel: 'moderate',
    goal: 'cut',
    tdee: 2200, // Placeholder
};

const DEFAULT_LOG: DailyLog = {
    caloriesIn: 850, // Mock initial data
    protein: 80,
    carbs: 60,
    fats: 30,
    history: [
        { id: '1', name: 'Oatmeal & Whey', calories: 450, protein: 40, carbs: 40, fats: 10, timestamp: Date.now() - 100000 },
        { id: '2', name: 'Chicken Salad', calories: 400, protein: 40, carbs: 20, fats: 20, timestamp: Date.now() - 50000 },
    ],
};

export const useStore = create<AppState>()(
    persist(
        set => ({
            user: DEFAULT_USER,
            dailyLog: DEFAULT_LOG,
            ui: {
                modalOpen: false,
                activeTab: 'dashboard',
            },

            updateProfile: (profile) => set((state) => ({ user: { ...state.user, ...profile } })),

            calculateTDEE: () => set((state) => {
                const { weight, height, age, activityLevel, goal } = state.user;
                // Mifflin-St Jeor
                let bmr = 10 * weight + 6.25 * height - 5 * age + 5; // Male assumed for now

                const activityMultipliers = {
                    sedentary: 1.2,
                    light: 1.375,
                    moderate: 1.55,
                    active: 1.725,
                    athlete: 1.9,
                };

                let tdee = Math.round(bmr * activityMultipliers[activityLevel]);

                if (goal === 'cut') tdee -= 500;
                if (goal === 'bulk') tdee += 500;

                return { user: { ...state.user, tdee } };
            }),

            logFood: (food) => set((state) => ({
                dailyLog: {
                    ...state.dailyLog,
                    caloriesIn: state.dailyLog.caloriesIn + food.calories,
                    protein: state.dailyLog.protein + food.protein,
                    carbs: state.dailyLog.carbs + food.carbs,
                    fats: state.dailyLog.fats + food.fats,
                    history: [{ ...food, id: Math.random().toString(36).substr(2, 9), timestamp: Date.now() }, ...state.dailyLog.history]
                }
            })),

            resetDay: () => set({ dailyLog: { caloriesIn: 0, protein: 0, carbs: 0, fats: 0, history: [] } }),

            setModalOpen: (isOpen) => set((state) => ({ ui: { ...state.ui, modalOpen: isOpen } })),
            setActiveTab: (tab) => set((state) => ({ ui: { ...state.ui, activeTab: tab } })),
        }),
        {
            name: 'cut-storage',
        }
    )
);
