/**
 * Loading spinner component
 * Shows a spinning animation to indicate loading state
 */
export const Loader = ({ size = 'medium', text = '' }) => {
    const sizes = {
        small: 'w-6 h-6 border-2',
        medium: 'w-12 h-12 border-3',
        large: 'w-16 h-16 border-4',
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div className={`${sizes[size]} border-primary-200 border-t-primary-600 rounded-full animate-spin`}></div>
            {text && <p className="text-gray-600 text-sm">{text}</p>}
        </div>
    );
};
