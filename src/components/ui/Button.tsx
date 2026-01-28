import React, { type ComponentProps, type ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

type ButtonProps = ComponentProps<typeof motion.button> & {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
    children?: ReactNode;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center rounded-lg font-bold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-lime disabled:pointer-events-none disabled:opacity-50";

        const variants = {
            primary: "bg-electric-lime text-obsidian shadow-[0_0_20px_-5px_rgba(204,255,0,0.4)] hover:bg-electric-lime/90 hover:shadow-[0_0_25px_-5px_rgba(204,255,0,0.6)]",
            secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/5",
            ghost: "hover:bg-white/5 text-white/70 hover:text-white",
            danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20",
        };

        const sizes = {
            sm: "h-9 px-4 text-xs uppercase",
            md: "h-11 px-8 text-sm uppercase",
            lg: "h-14 px-10 text-base uppercase",
            icon: "h-10 w-10",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {isLoading ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                ) : null}
                {children}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
