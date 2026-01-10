"use client";

import Spline from '@splinetool/react-spline';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function SplineBackground() {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none">
            {/* 
          SPLINE INTEGRATION NOTES:
          - We use 'pointer-events-none' to ensure the background never hijacks scroll/clicks.
          - The scene is set to 'prod' mode instructions to use a specific generic abstract URL.
          - SWAP URL INSTRUCTION: Replace the 'scene' prop string with your own exported Spline Prod URL.
       */}

            {/* Loading State Placeholder - Soft Gradient */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-[#111] z-10 transition-opacity duration-1000" />
            )}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 0.6 : 0 }}
                transition={{ duration: 1.5 }}
                className="w-full h-full scale-[1.2]" // Slight scale to ensure full coverage
            >
                <Spline
                    // Using a generic abstract mesh URL from Spline community (public domain/common example)
                    // If this URL is invalid, it simply won't load, showing the graceful fallback.
                    // Placeholder: "Abstract Dark Matter" style
                    scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                    onLoad={() => setIsLoaded(true)}
                />
            </motion.div>

            {/* Overlay to ensure text readability (Darken Filter) */}
            <div className="absolute inset-0 bg-[#0A0A0A]/60 backdrop-blur-[1px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
        </div>
    );
}
