import { NavLink } from 'react-router-dom';

/**
 * Navigation component
 * Bottom navigation bar for mobile-first design
 */
export const Navigation = () => {
    // Active link styling
    const getLinkClass = ({ isActive }) => {
        const baseClass = 'flex flex-col items-center justify-center gap-1 py-2 px-4 rounded-lg transition-all duration-200 ease-in-out';
        return isActive
            ? `${baseClass} text-primary-600 bg-primary-50`
            : `${baseClass} text-gray-600 hover:text-primary-600 hover:bg-gray-100`;
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
            <div className="max-w-md mx-auto px-4">
                <div className="flex items-center justify-around py-2">
                    {/* Dashboard Link */}
                    <NavLink to="/" className={getLinkClass}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="text-xs font-medium">Home</span>
                    </NavLink>

                    {/* Add Meal Link */}
                    <NavLink to="/add-meal" className={getLinkClass}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="text-xs font-medium">Add Meal</span>
                    </NavLink>

                    {/* History Link */}
                    <NavLink to="/history" className={getLinkClass}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs font-medium">History</span>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};
