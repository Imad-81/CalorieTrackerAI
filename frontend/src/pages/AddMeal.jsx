import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMeals } from '../hooks/useMeals';
import { ImageUploader } from '../components/ImageUploader';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Loader } from '../components/Loader';
import { calculateCalories } from '../services/calorieService';

/**
 * Add Meal Page
 * Allows users to upload food image, select meal type, describe portion, and calculate calories
 */
export const AddMeal = () => {
    const navigate = useNavigate();
    const { addMeal } = useMeals();

    // Form state
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [mealType, setMealType] = useState('Breakfast');
    const [portionDescription, setPortionDescription] = useState('');

    // Loading and result state
    const [isCalculating, setIsCalculating] = useState(false);
    const [calculationResult, setCalculationResult] = useState(null);

    const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

    const handleImageSelect = (file) => {
        setSelectedImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleCalculate = async (e) => {
        e.preventDefault();

        if (!selectedImage) {
            alert('Please upload a food image');
            return;
        }

        if (!portionDescription.trim()) {
            alert('Please describe the portion size');
            return;
        }

        setIsCalculating(true);

        try {
            // Call mock AI service
            const result = await calculateCalories(selectedImage, portionDescription);
            setCalculationResult(result);
        } catch (error) {
            console.error('Error calculating calories:', error);
            alert('Failed to calculate calories. Please try again.');
        } finally {
            setIsCalculating(false);
        }
    };

    const handleSaveMeal = () => {
        // Create meal object
        const meal = {
            foodName: calculationResult.foodName,
            calories: calculationResult.adjustedCalories,
            mealType,
            portionDescription,
            imageUrl: imagePreview,
            confidence: calculationResult.confidence,
        };

        // Add meal to storage
        addMeal(meal);

        // Navigate back to dashboard
        navigate('/');
    };

    const handleReset = () => {
        setSelectedImage(null);
        setImagePreview(null);
        setPortionDescription('');
        setCalculationResult(null);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Meal</h1>
                <p className="text-gray-600">Upload a photo and let AI calculate the calories</p>
            </div>

            {!calculationResult ? (
                <form onSubmit={handleCalculate} className="space-y-6">
                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Food Image <span className="text-red-500">*</span>
                        </label>
                        <ImageUploader
                            onImageSelect={handleImageSelect}
                            selectedImage={selectedImage}
                        />
                    </div>

                    {/* Meal Type Selector */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Meal Type <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {mealTypes.map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setMealType(type)}
                                    className={`py-3 px-4 rounded-lg border-2 font-medium transition-all duration-200 ease-in-out ${mealType === type
                                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Portion Description */}
                    <Input
                        label="Portion Description"
                        multiline
                        rows={4}
                        value={portionDescription}
                        onChange={(e) => setPortionDescription(e.target.value)}
                        placeholder="Describe how much you ate (e.g., 'half plate', '2 slices', 'full bowl')"
                        required
                    />

                    {/* Calculate Button */}
                    <Button
                        type="submit"
                        fullWidth
                        disabled={isCalculating || !selectedImage}
                    >
                        {isCalculating ? 'Calculating...' : 'Calculate Calories'}
                    </Button>
                </form>
            ) : (
                <div className="space-y-6">
                    {/* Calculation Result */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Calculation Result</h2>
                            <span className="text-sm text-gray-500">
                                {(calculationResult.confidence * 100).toFixed(0)}% confidence
                            </span>
                        </div>

                        {/* Food Image */}
                        <img
                            src={imagePreview}
                            alt="Food"
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />

                        {/* Food Details */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center pb-3 border-b">
                                <span className="text-gray-600">Detected Food</span>
                                <span className="font-semibold text-gray-900">{calculationResult.foodName}</span>
                            </div>

                            <div className="flex justify-between items-center pb-3 border-b">
                                <span className="text-gray-600">Meal Type</span>
                                <span className="font-semibold text-gray-900">{mealType}</span>
                            </div>

                            <div className="flex justify-between items-center pb-3 border-b">
                                <span className="text-gray-600">Portion</span>
                                <span className="font-semibold text-gray-900">{portionDescription}</span>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <span className="text-lg text-gray-900">Total Calories</span>
                                <span className="text-3xl font-bold text-primary-600">
                                    {calculationResult.adjustedCalories} cal
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={handleReset} fullWidth>
                            Add Another
                        </Button>
                        <Button onClick={handleSaveMeal} fullWidth>
                            Save Meal
                        </Button>
                    </div>
                </div>
            )}

            {/* Loading Overlay */}
            {isCalculating && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8">
                        <Loader size="large" text="Analyzing your food..." />
                    </div>
                </div>
            )}
        </div>
    );
};
