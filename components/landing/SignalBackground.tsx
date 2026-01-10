"use client";

import { cn } from "@/lib/utils";

export function SignalBackground({ className }: { className?: string }) {
    return (
        <div className={cn("absolute inset-0 z-0 pointer-events-none overflow-hidden", className)}>
            {/* 
        ANIMATION: "The Signal Field"
        Logic: A repeating pattern of extremely faint horizontal lines drifting vertically.
        Technique: CSS background-position animation on a repeating-linear-gradient.
        Why: Constant, smooth, linear motion implies a stable, never-ending connection.
      */}
            <div
                className="absolute inset-0 opacity-[0.08] animate-drift" // Increased opacity for visibility
                style={{
                    backgroundImage: `repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 80px, 
            white 80px, 
            white 81px
          )`,
                    backgroundSize: "100% 81px",
                }}
            />

            {/* Radial Mask to fade out edges */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        </div>
    );
}
