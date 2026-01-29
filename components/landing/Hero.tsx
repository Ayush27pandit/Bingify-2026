"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { ParticleBackground } from "./ParticleBackground";
import { VideoModal } from "./VideoModal";

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Hero() {
    const [isDemoOpen, setIsDemoOpen] = useState(false);

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#09090B]">
            {/* Particle Background */}
            <ParticleBackground />

            {/* Gradient overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-purple-950/10 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-900/15 via-transparent to-transparent pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-6 pt-32 pb-24">
                {/* Hero Text - Centered */}
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, ease: EASE_EXPO }}
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-zinc-400 mb-8 backdrop-blur-sm">
                            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                            In sync
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1] mb-6">
                            Watch together,
                            <br />
                            <span className="text-zinc-500">from anywhere.</span>
                        </h1>

                        {/* Subtext */}
                        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
                            Movie nights with the people you love, no matter the distance.
                            Frame-perfect sync, real-time video chat, and a moment that actually feels shared.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/start" className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all hover:bg-zinc-200">
                                Start watching together
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <button
                                onClick={() => setIsDemoOpen(true)}
                                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-medium text-white transition-all hover:bg-white/10 backdrop-blur-sm"
                            >
                                <Play className="h-4 w-4 fill-current" />
                                See how it works
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Product Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 60, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: EASE_EXPO }}
                    className="mt-20 max-w-6xl mx-auto"
                >
                    <div className="relative rounded-2xl border border-white/10 bg-[#111113] p-2 shadow-2xl shadow-black/50 overflow-hidden">
                        {/* Glow effect */}
                        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-40 bg-blue-500/20 blur-[100px] pointer-events-none" />

                        {/* Dashboard mockup content */}
                        <div className="relative rounded-xl bg-[#0A0A0C] overflow-hidden">
                            {/* Top bar */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                                </div>
                                <div className="text-xs text-zinc-600 font-mono">bingify.app/lobby/room</div>
                                <div className="w-16" />
                            </div>

                            {/* Main dashboard area */}
                            <div className="aspect-[16/9] w-full h-full relative">
                                <img
                                    src="https://wnvechfqaaomuauwzcjz.supabase.co/storage/v1/object/public/assests/Screenshot%202026-01-29%20120954.png"
                                    alt="Bingify Dashboard"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Avatars in corner */}
                            <div className="absolute bottom-4 right-4 flex items-center">
                                {[0, 1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className="relative -ml-2 first:ml-0 h-8 w-8 rounded-full border-2 border-[#0A0A0C] bg-zinc-700 flex items-center justify-center text-[10px] font-medium text-zinc-300"
                                    >
                                        {["JD", "AK", "MR"][i]}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#09090B] to-transparent pointer-events-none" />

            {/* Video Modal */}
            <VideoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
        </section>
    );
}
