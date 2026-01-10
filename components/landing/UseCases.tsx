"use client";

import { motion } from "framer-motion";
import { Users, Heart, Home } from "lucide-react";

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const useCases = [
    {
        icon: Users,
        title: "Friends",
        description: "Weekly movie nights, no matter where everyone moved after college.",
    },
    {
        icon: Heart,
        title: "Couples",
        description: "Date night across time zones. The distance feels a little smaller.",
    },
    {
        icon: Home,
        title: "Family",
        description: "Keep traditions alive, even when you can't be in the same room.",
    },
];

export function UseCases() {
    return (
        <section className="relative py-20 bg-gradient-to-b from-[#09090B] via-[#0C0C0E] to-[#09090B]">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: EASE_EXPO }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                        For the people who matter.
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-xl mx-auto">
                        Whether it's date night across time zones, family traditions from afar, or just hanging out with friends—this is how you stay close.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ staggerChildren: 0.15 }}
                    className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
                >
                    {useCases.map((useCase, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.7, ease: EASE_EXPO },
                                },
                            }}
                            className="group relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10"
                        >
                            {/* Glow */}
                            <div className="absolute inset-0 rounded-2xl bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{ filter: 'blur(40px)' }} />

                            {/* Icon */}
                            <div className="relative mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 group-hover:border-blue-500/30 transition-colors shadow-lg">
                                <useCase.icon className="h-7 w-7 text-zinc-400 group-hover:text-blue-400 transition-colors" strokeWidth={1.5} />
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-medium text-white mb-3">{useCase.title}</h3>

                            {/* Description */}
                            <p className="text-sm text-zinc-500 leading-relaxed">{useCase.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
