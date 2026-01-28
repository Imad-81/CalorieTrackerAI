import { useState } from 'react';
import { Send, Zap } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface AICaptureProps {
    onLog: (text: string) => void;
}

export const AICapture: React.FC<AICaptureProps> = ({ onLog }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onLog(input);
            setInput('');
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto relative group">
            {/* Glow Effect behind input */}
            <div className="absolute -inset-1 bg-gradient-to-r from-electric-lime/20 to-transparent rounded-lg blur opacity-0 group-focus-within:opacity-100 transition duration-1000 group-hover:duration-200"></div>

            <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
                <div className="relative flex-1">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-electric-lime animate-pulse">
                        <Zap className="w-4 h-4" fill="currentColor" />
                    </div>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Describe your meal (e.g. 200g chicken and rice)..."
                        className="pl-12 pr-4 h-14 bg-zinc-900/80 backdrop-blur-xl border-zinc-800 focus:border-electric-lime text-lg font-medium"
                    />
                </div>

                <Button type="submit" size="icon" variant="primary" className="h-14 w-14 rounded-xl shrink-0">
                    <Send className="w-5 h-5" />
                </Button>
            </form>

            {/* Quick Actions / Suggestions */}
            <div className="flex gap-2 mt-4 justify-center overflow-x-auto pb-2 scrollbar-hide">
                {['Repeat Breakfast', 'Yesterday Lunch', 'Coffee'].map((item) => (
                    <button
                        key={item}
                        onClick={() => setInput(item)} // Or trigger direct add
                        className="text-xs font-bold text-zinc-500 bg-zinc-900/50 hover:bg-zinc-800 hover:text-white px-3 py-1.5 rounded-md border border-zinc-800 transition-colors whitespace-nowrap uppercase tracking-wider"
                    >
                        + {item}
                    </button>
                ))}
            </div>
        </div>
    );
};
