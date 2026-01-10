"use client";

import { motion } from "framer-motion";

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ConnectionVisualizer() {
    return (
        <section className="py-24 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center justify-center gap-12 text-center mb-12">
                    <h2 className="text-3xl font-semibold tracking-tight text-white">Global Infrastructure</h2>
                </div>

                <div className="relative mx-auto flex max-w-4xl items-center justify-between px-12 md:px-24">
                    {/* Node A: London */}
                    <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl">
                            <div className="h-3 w-3 rounded-full bg-slate-400" />
                        </div>
                        <span className="text-xs font-medium tracking-widest text-slate-500 uppercase">London</span>
                    </div>

                    {/* Connected Fiber Path */}
                    <div className="absolute top-1/2 left-0 h-20 w-full -translate-y-[calc(50%+2rem)] px-32 md:px-44">
                        {/* This container logic is a bit rigid, using absolute positioning SVG is better for "between nodes" */}
                        <svg className="h-full w-full overflow-visible" viewBox="0 0 400 40" preserveAspectRatio="none">
                            {/* 
                   Using a simple straight line or curve in the SVG. 
                   For simplicity and responsiveness, we'll draw a straight line. 
                */}
                            <motion.path
                                d="M 0 20 L 400 20"
                                fill="none"
                                stroke="#334155" // Slate-700
                                strokeWidth="1"
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: EASE_EXPO }}
                            />

                            {/* The Data Packet Glow Dot */}

                            {/* Re-implementing the dot as a separate motion div on top might be easier for 'traveling' logic without dealing with SVG coordinate complexities if we just want x-axis movement. */}
                        </svg>

                        {/* The Traveling Dot (Layered on top of SVG for easier control) */}
                        <motion.div
                            className="absolute top-1/2 left-0 h-1.5 w-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                            style={{ top: 'calc(50% - 3px)' }} // Centered vertically relative to the container which is aligned with nodes.
                            initial={{ left: '15%' }} // Starting after node A
                            animate={{ left: '85%' }} // Ending before node B
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear", // Packet travel usually constant speed or mechanical.
                            }}
                        />
                    </div>

                    {/* Node B: Tokyo */}
                    <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl">
                            <div className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        </div>
                        <span className="text-xs font-medium tracking-widest text-slate-500 uppercase">Tokyo</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
