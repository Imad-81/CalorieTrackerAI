
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-electric-lime/10 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[20%] w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full mix-blend-screen" />
            </div>

            <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-20 max-w-7xl mx-auto">
                <div className="text-2xl font-black tracking-tighter italic">CUT.</div>
                <button
                    onClick={() => navigate('/login')}
                    className="text-sm font-bold tracking-widest uppercase hover:text-electric-lime transition-colors"
                >
                    Login
                </button>
            </nav>

            <main className="relative z-10 flex flex-col items-center text-center max-w-5xl mx-auto space-y-10 mt-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                >
                    <h1 className="text-[12vw] leading-[0.8] md:text-[8rem] font-black tracking-tighter uppercase text-crisp-white">
                        Bold. <span className="text-electric-lime">Fast.</span> <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">Leann.</span>
                    </h1>
                </motion.div>

                <motion.p
                    className="text-lg md:text-2xl text-white/60 font-medium tracking-tight max-w-lg leading-relaxed mix-blend-plus-lighter"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                >
                    The calorie tracker for those who demand precision.
                    Capture via AI. Analyze. Execute.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: "backOut" }}
                >
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="group relative px-10 py-5 bg-electric-lime text-obsidian font-black text-xl uppercase tracking-widest rounded-full hover:bg-electric-lime/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_50px_-15px_rgba(204,255,0,0.5)]"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Get Started <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </motion.div>
            </main>

            {/* Floating minimalist badges */}
            <motion.div
                className="absolute bottom-10 left-10 hidden md:block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
            >
                <div className="flex bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-electric-lime animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white/50">V 1.0.0 Alpha</span>
                </div>
            </motion.div>
        </div>
    );
};
