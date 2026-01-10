"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function InteractionDemo() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="py-24 bg-slate-900/20 border-y border-white/5">
            <div className="container mx-auto max-w-lg px-6 text-center">
                <h2 className="mb-2 text-2xl font-semibold text-white">The Latency Test</h2>
                <p className="mb-12 text-slate-500">Instantaneous state synchronization across cliets.</p>

                <div className="relative rounded-2xl border border-white/10 bg-[#0A0A0A] p-10 shadow-2xl">

                    {/* Play/Pause Button */}
                    <motion.button
                        onClick={() => setIsPlaying(!isPlaying)}
                        whileHover={{
                            boxShadow: "0 0 25px rgba(59, 130, 246, 0.4)", // Increase shadow spread
                            scale: 1, // Explicitly no scale
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-black outline-none"
                    >
                        <AnimatePresence mode="wait">
                            {isPlaying ? (
                                <motion.div
                                    key="pause"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Pause className="fill-black h-8 w-8" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="play"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Play className="fill-black ml-1 h-8 w-8" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>

                    {/* Progress Line */}
                    <div className="mt-10 relative h-1 w-full overflow-hidden rounded-full bg-slate-800">
                        <motion.div
                            animate={{ width: isPlaying ? "100%" : "30%" }} // 30% static starting point for drama
                            transition={{
                                duration: isPlaying ? 10 : 0.5, // Slow play move, fast reset
                                ease: "linear"
                            }}
                            className="absolute top-0 left-0 h-full bg-blue-500"
                        />
                    </div>

                    {/* Status Micro-text */}
                    <div className="mt-4 flex justify-between text-xs font-mono">
                        <span className="text-slate-500">BUFFER: 0ms</span>
                        <AnimatePresence>
                            {isPlaying && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-blue-500 font-bold"
                                >
                                    STATUS: SYNCED
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
