"use client";

import { motion } from "framer-motion";
import { Headphones, Share2, ShieldCheck } from "lucide-react";

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const features = [
    {
        icon: Headphones,
        title: "Spatial Audio",
        description: "Immersive 3D soundscapes that place you in the center of the action.",
    },
    {
        icon: Share2,
        title: "Shared Controls",
        description: "Granular permission settings for playback, volume, and seeking.",
    },
    {
        icon: ShieldCheck,
        title: "Encrypted Stream",
        description: "End-to-end encryption ensuring your private viewings stay private.",
    },
];

export function FeatureGrid() {
    return (
        <section className="bg-slate-950/30 py-24">
            <div className="container mx-auto px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ staggerChildren: 0.15 }}
                    className="grid gap-8 md:grid-cols-3"
                >
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    filter: "blur(0px)",
                                    transition: { duration: 0.8, ease: EASE_EXPO },
                                },
                            }}
                            className="group rounded-xl border border-white/5 bg-white/[0.02] p-8 transition-colors hover:bg-white/[0.04]"
                        >
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                                <feature.icon className="h-6 w-6 text-blue-500" strokeWidth={1.5} />
                            </div>
                            <h3 className="mb-3 text-lg font-medium text-white">{feature.title}</h3>
                            <p className="text-sm leading-relaxed text-slate-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
