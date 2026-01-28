
import { NavLink, Outlet } from 'react-router-dom';
import { Home, BarChart2, User, Camera } from 'lucide-react';
import { cn } from '../lib/utils';

export const DashboardLayout = () => {
    const navItems = [
        { icon: Home, label: 'Dashboard', path: '/dashboard' },
        { icon: BarChart2, label: 'Stats', path: '/stats' },
        { icon: User, label: 'Profile', path: '/profile' },
    ];

    return (
        <div className="min-h-screen bg-obsidian text-white flex flex-col md:flex-row relative overflow-hidden">
            {/* Background Ambience */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-electric-lime/5 blur-[150px] rounded-full mix-blend-screen" />
            </div>

            {/* Desktop Side Nav */}
            <aside className="hidden md:flex flex-col w-24 h-screen py-8 border-r border-white/5 bg-black/20 backdrop-blur-xl fixed left-0 top-0 z-50 items-center justify-between">
                <div className="font-black italic text-2xl tracking-tighter text-electric-lime">C.</div>

                <nav className="flex flex-col gap-8 w-full items-center">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => cn(
                                "p-3 rounded-xl transition-all duration-300 relative group",
                                isActive ? "text-electric-lime bg-white/5" : "text-zinc-500 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <item.icon className="w-6 h-6" strokeWidth={2.5} />
                            <span className="sr-only">{item.label}</span>
                            {/* Glow dot for active state */}
                            {/* <div className={cn("absolute right-[-14px] top-1/2 -translate-y-1/2 w-1 h-8 rounded-l-full bg-electric-lime transition-all duration-300", isActive ? "opacity-100" : "opacity-0")} /> */}
                        </NavLink>
                    ))}
                </nav>

                <div className="w-10 h-10 bg-zinc-800 rounded-full" /> {/* Avatar Placeholder */}
            </aside>

            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 w-full p-4 z-50 bg-black/80 backdrop-blur-lg border-t border-white/5 flex justify-around items-center safe-area-bottom">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => cn(
                            "p-3 rounded-full transition-all duration-300",
                            isActive ? "text-electric-lime" : "text-zinc-500"
                        )}
                    >
                        <item.icon className="w-6 h-6" strokeWidth={2.5} />
                    </NavLink>
                ))}
                {/* Floating Capture Button for Mobile */}
                <button className="absolute -top-6 left-1/2 -translate-x-1/2 bg-electric-lime text-black p-4 rounded-full shadow-[0_0_30px_-5px_rgba(204,255,0,0.5)] border-4 border-obsidian">
                    <Camera className="w-6 h-6" />
                </button>
            </nav>

            <main className="flex-1 md:ml-24 p-4 md:p-10 pb-24 md:pb-10 z-10 w-full max-w-7xl mx-auto">
                <Outlet />
            </main>
        </div>
    );
};
