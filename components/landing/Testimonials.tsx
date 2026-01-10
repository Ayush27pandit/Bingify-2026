"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const testimonials = [
    {
        quote: "Friday movie nights with my best friends feel real again. We laugh at the same moments, pause to grab snacks together. It's like we never left the same city.",
        name: "Sarah Chen",
        role: "San Francisco",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        featured: true,
    },
    {
        quote: "Long distance is hard. But watching our favorite show together every week? That part got a lot easier.",
        name: "Marcus & Jamie",
        role: "NYC ↔ London",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        handle: "@marcusjamie",
    },
    {
        quote: "My mom and I watch old Bollywood films together now, even though she's 8,000 miles away. She can see my reactions. I can see hers.",
        name: "Priya Sharma",
        role: "Toronto",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
        quote: "No more 'wait, are you at the same part as me?' Just press play and it works.",
        name: "David Kim",
        role: "Seattle",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        handle: "@davidwatches",
    },
    {
        quote: "We do Sunday family movies across three time zones now. The kids love that grandma can wave at them during the boring parts.",
        name: "Elena Rodriguez",
        role: "Austin",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        featured: true,
    },
];

export function Testimonials() {
    return (
        <section className="relative py-20 bg-[#09090B]">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE_EXPO }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-4">
                        Real moments, shared.
                    </h2>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ staggerChildren: 0.1 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
                >
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.5, ease: EASE_EXPO },
                                },
                            }}
                            className={`group relative rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:bg-white/[0.04] hover:border-white/10 ${testimonial.featured ? "md:col-span-2 lg:col-span-1" : ""
                                }`}
                        >
                            {/* Quote */}
                            <p className={`text-zinc-300 leading-relaxed mb-6 ${testimonial.featured ? "text-lg" : "text-sm"}`}>
                                "{testimonial.quote}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-zinc-800">
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-white">{testimonial.name}</div>
                                    <div className="text-xs text-zinc-500">{testimonial.role}</div>
                                </div>
                                {testimonial.handle && (
                                    <div className="ml-auto">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                                            {testimonial.handle}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
