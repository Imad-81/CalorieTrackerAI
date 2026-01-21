import { Navigation } from '../components/Navigation';

/**
 * Main Layout component
 * Wraps all pages with navigation
 */
export const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <main className="pb-20">
                {children}
            </main>

            {/* Bottom Navigation */}
            <Navigation />
        </div>
    );
};
