"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function FinalCTA() {
    return (
        <section className="relative py-20 bg-gradient-to-b from-[#09090B] via-[#0D0D10] to-[#09090B] overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 pointer-events-none" style={{ filter: 'blur(150px)' }} />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: EASE_EXPO }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
                        Ready when you are.
                    </h2>
                    <p className="text-lg text-zinc-400 mb-10">
                        No pressure. Just good company waiting to happen.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/start" className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all hover:bg-zinc-200">
                            Start watching together
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link href="/start" className="text-sm text-zinc-500 hover:text-white transition-colors">
                            Create a room →
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
