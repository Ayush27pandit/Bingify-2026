"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
    {
        name: "Free",
        price: "$0",
        description: "For trying Bingify with someone special.",
        features: [
            "Create 1 room per month",
            "Up to 2 people per room",
            "Limited movie & show collection",
        ],
        cta: "Start for free",
        highlight: false,
    },
    {
        name: "Standard",
        price: "$9",
        description: "For friends who watch together often.",
        features: [
            "Create up to 12 rooms per month",
            "Up to 4 people per room",
            "Expanded movie & show collection",
        ],
        cta: "Choose Standard",
        highlight: true,
        badge: "Most popular",
    },
    {
        name: "Premium",
        price: "$19",
        description: "For families and groups who never want limits.",
        features: [
            "Unlimited room creation",
            "Up to 6 people per room",
            "Full access to all movies & shows",
        ],
        cta: "Go Premium",
        highlight: false,
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-[#09090B] relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-blue-500/5 blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-semibold text-white mb-6 tracking-tight"
                    >
                        Start together for free. <br />
                        <span className="text-zinc-500">Upgrade when you’re ready.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-lg text-zinc-400"
                    >
                        Choose a plan that fits how you watch together.
                    </motion.p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`relative rounded-3xl p-8 border transition-all duration-300 ${plan.highlight
                                    ? "bg-white/[0.03] border-blue-500/50 shadow-2xl shadow-blue-500/10"
                                    : "bg-white/[0.02] border-white/5 hover:border-white/10"
                                }`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-blue-600 text-xs font-semibold text-white tracking-wide uppercase shadow-lg shadow-blue-600/20">
                                    {plan.badge}
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className={`text-lg font-medium mb-2 ${plan.highlight ? "text-white" : "text-zinc-300"}`}>
                                    {plan.name}
                                </h3>
                                <div className="mb-4">
                                    <span className="text-4xl font-bold text-white tracking-tight">{plan.price}</span>
                                    {plan.price !== "Free" && <span className="text-zinc-500 ml-1">/mo</span>}
                                </div>
                                <p className="text-sm text-zinc-400 leading-relaxed min-h-[40px]">
                                    {plan.description}
                                </p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                                        <div className={`mt-0.5 rounded-full p-0.5 ${plan.highlight ? "bg-blue-500/20 text-blue-400" : "bg-white/10 text-zinc-400"}`}>
                                            <Check className="h-3 w-3" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 rounded-xl text-sm font-semibold transition-all ${plan.highlight
                                    ? "bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/5"
                                    : "bg-white/5 text-white border border-white/5 hover:bg-white/10"
                                }`}>
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Micro-copy */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="text-sm text-zinc-600">
                        Change or cancel your plan anytime. No long-term commitments.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
