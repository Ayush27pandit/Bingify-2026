"use client";

import AuthButtons from "@/components/auth/AuthButtons";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AuthPage() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-[#09090B]">


            {/* Gradient overlays for depth - matching Hero but without particles */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-purple-950/10 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, ease: EASE_EXPO }}
                    className="w-full max-w-md"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors mb-8 group"
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to home
                    </Link>

                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-semibold text-white mb-2">Welcome back</h1>
                        <p className="text-zinc-500">Sign in to sync your experience</p>
                    </div>

                    <div className="glass-dark p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                        {/* Subtle inner glow */}
                        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 blur-3xl pointer-events-none" />

                        <AuthButtons />
                    </div>
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#09090B] to-transparent pointer-events-none" />
        </main>
    );
}
