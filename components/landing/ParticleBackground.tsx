"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
    x: number;
    y: number;
    size: number;
    speedY: number;
    opacity: number;
}

export function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        if (prefersReducedMotion) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        // Resize handler
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Initialize particles
        // TWEAK: Adjust count for density (lower = sparser)
        const particleCount = Math.floor((canvas.width * canvas.height) / 25000);

        const createParticle = (startAtBottom = false): Particle => ({
            x: Math.random() * canvas.width,
            y: startAtBottom ? canvas.height + 10 : Math.random() * canvas.height,
            // TWEAK: size range - increased for visibility
            size: Math.random() * 1.5 + 1,
            // TWEAK: speed
            speedY: Math.random() * 0.4 + 0.3,
            // TWEAK: opacity - increased for brightness
            opacity: Math.random() * 0.3 + 0.3,
        });

        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }

        // Animation loop
        const animate = () => {
            // Trail effect: higher opacity = faster fade = thinner trails
            ctx.fillStyle = "rgba(9, 9, 11, 0.35)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                // Move particle upward
                particle.y -= particle.speedY;

                // Reset particle if it goes off screen
                if (particle.y < -10) {
                    particles[index] = createParticle(true);
                }

                // Draw particle with glow effect
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(150, 180, 255, ${particle.opacity})`;
                ctx.shadowColor = "rgba(100, 150, 255, 0.8)";
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowBlur = 0; // Reset for next particle
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [prefersReducedMotion]);

    // If reduced motion is preferred, show a static subtle gradient
    if (prefersReducedMotion) {
        return (
            <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-transparent via-white/[0.02] to-transparent" />
        );
    }

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            aria-hidden="true"
        />
    );
}
