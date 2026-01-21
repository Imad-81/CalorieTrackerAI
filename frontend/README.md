# Calorie Tracker AI - Frontend

A modern, mobile-first calorie tracking web application built with React and Vite. Upload food images, describe portions, and let AI calculate calories automatically.

## 🚀 Features

- **📸 Image Upload**: Upload photos of your meals with drag-and-drop support
- **🤖 AI Calorie Calculation**: Mock AI service simulates intelligent calorie estimation
- **📊 Dashboard**: View today's calorie summary and meal breakdown
- **📜 History**: Browse past meals organized by date
- **📱 Mobile-First Design**: Responsive design optimized for mobile devices
- **💾 Local Storage**: Meals persist across sessions using localStorage

## 🛠️ Tech Stack

- **Bun** - Fast JavaScript runtime and package manager
- **Vite** - Next-generation frontend build tool
- **React** - UI library (JavaScript, not TypeScript)
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Loader.jsx
│   │   ├── ImageUploader.jsx
│   │   ├── MealCard.jsx
│   │   ├── CalorieSummary.jsx
│   │   └── Navigation.jsx
│   ├── pages/            # Page components
│   │   ├── Dashboard.jsx
│   │   ├── AddMeal.jsx
│   │   └── History.jsx
│   ├── layouts/          # Layout components
│   │   └── MainLayout.jsx
│   ├── services/         # API and business logic
│   │   └── calorieService.js
│   ├── hooks/            # Custom React hooks
│   │   └── useMeals.js
│   ├── utils/            # Utility functions
│   │   ├── storage.js
│   │   └── dateUtils.js
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # App entry point
│   └── index.css         # Global styles with Tailwind
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🏃 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your system

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
bun install
```

3. Start the development server:
```bash
bun run dev
```

4. Open your browser and visit the URL shown in the terminal (usually `http://localhost:5173`)

## 📖 How to Use

### Adding a Meal

1. Click the **"Add Meal"** button in the navigation
2. Upload a photo of your food
3. Select the meal type (Breakfast, Lunch, Dinner, or Snack)
4. Describe the portion size (e.g., "half plate", "2 slices", "full bowl")
5. Click **"Calculate Calories"** to get AI-estimated calories
6. Review the result and click **"Save Meal"**

### Viewing Dashboard

- See today's total calories vs. your daily goal
- View calorie breakdown by meal type
- See all meals logged today

### Browsing History

- View all past meals organized by date
- Click on any date to expand and see meals
- See daily calorie totals

## 🎨 Design Principles

- **Clean & Minimal**: Focused on usability and clarity
- **Mobile-First**: Optimized for mobile devices with bottom navigation
- **Accessible**: Proper semantic HTML and ARIA labels
- **Well-Commented**: Code includes helpful comments for learning

## 🔮 Future Enhancements

This is currently a **frontend-only** application with mock AI responses. Future improvements include:

- Real AI backend integration for food recognition
- User authentication and profiles
- Customizable calorie goals
- Nutritional information (protein, carbs, fats)
- Charts and analytics
- Meal recommendations

## 📝 Notes for Developers

### Mock AI Service

The `calorieService.js` file contains a mock AI that:
- Randomly selects food items from a database
- Parses portion descriptions to estimate serving size
- Adds realistic processing delays
- Returns calorie calculations with confidence scores

To integrate a real AI backend, replace the `calculateCalories` function in `services/calorieService.js` with actual API calls.

### State Management

The app uses React hooks for state management:
- `useMeals` hook manages meal data and localStorage persistence
- No external state management library needed for this scope

### Styling

Tailwind CSS is configured with custom colors and utility classes. See `tailwind.config.js` and `index.css` for customization.

## 🤝 Contributing

This is a college personal project. Feel free to fork and modify for your own learning!

## 📄 License

This project is open source and available for educational purposes.
