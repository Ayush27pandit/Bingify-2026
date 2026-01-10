"use client";

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const features = [
    {
        title: "Perfect Sync",
        description: "Not a second off. Everyone watches the exact same frame.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop", // Cyberpunk/Tech abstract
        className: "md:col-span-2 md:row-span-1",
    },
    {
        title: "Crystal Clear Video",
        description: "React in real time. Laugh together.",
        image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=1000&auto=format&fit=crop", // Camera lens / Glass
        className: "md:col-span-1 md:row-span-2",
    },
    {
        title: "Private Rooms",
        description: "Invite-only. Your space, your rules.",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1000&auto=format&fit=crop", // Cozy dark room
        className: "md:col-span-1 md:row-span-1",
    },
    {
        title: "Any Content",
        description: "Stream favorites or local files.",
        image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop", // Movie film / screen
        className: "md:col-span-1 md:row-span-1",
    },
    {
        title: "Instant Setup",
        description: "No installs. Just share a link.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop", // Network / Connection
        className: "md:col-span-1 md:row-span-1",
    },
    {
        title: "Made for Humans",
        description: "Less tech friction, more connection.",
        image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1000&auto=format&fit=crop", // Warm light / Party
        className: "md:col-span-2 md:row-span-1",
    },
];

export function Features() {
    return (
        <section className="relative py-24 bg-[#09090B]">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: EASE_EXPO }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
                        Simple by design.
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-xl mx-auto">
                        Create a room, invite your people, and press play. That's it.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ staggerChildren: 0.08 }}
                    className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto"
                >
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 20, scale: 0.95 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: { duration: 0.5, ease: EASE_EXPO },
                                },
                            }}
                            whileHover={{
                                scale: 1.01,
                                transition: { duration: 0.3, ease: EASE_EXPO }
                            }}
                            className={`group relative rounded-3xl bg-[#0F0F11] overflow-hidden cursor-pointer ${feature.className} min-h-[220px]`}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="h-full w-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-[#09090B]/80 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors">{feature.title}</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed max-w-[90%] group-hover:text-zinc-300 transition-colors">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
