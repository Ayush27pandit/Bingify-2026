"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Plus, Users, ArrowRight, Copy, Check } from "lucide-react";
import { ParticleBackground } from "@/components/landing/ParticleBackground";
import { Navbar } from "@/components/landing/Navbar";

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function StartPage() {
    const [mode, setMode] = useState<"create" | "join">("create");
    const [roomCode, setRoomCode] = useState("");
    const [copied, setCopied] = useState(false);

    // Mock room creation - in real app this would call API
    const generatedCode = "MOON-BASE";

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="min-h-screen bg-[#09090B] relative overflow-hidden font-sans selection:bg-blue-500/30">
            <Navbar />
            <ParticleBackground />

            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-transparent to-purple-950/10 pointer-events-none" />

            <div className="relative z-10 container mx-auto px-6 min-h-screen flex flex-col items-center justify-center pt-20">

                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute top-24 left-6 md:left-20"
                >
                    <Link href="/" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors group">
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE_EXPO }}
                    className="w-full max-w-md"
                >
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3">
                            Ready to watch?
                        </h1>
                        <p className="text-zinc-400">
                            Create a new room or join an existing one.
                        </p>
                    </div>

                    {/* Card */}
                    <div className="relative rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl overflow-hidden shadow-2xl">
                        {/* Tabs */}
                        <div className="flex border-b border-white/5">
                            <button
                                onClick={() => setMode("create")}
                                className={`flex-1 py-4 text-sm font-medium transition-colors relative ${mode === "create" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                                    }`}
                            >
                                Create Room
                                {mode === "create" && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                                    />
                                )}
                            </button>
                            <button
                                onClick={() => setMode("join")}
                                className={`flex-1 py-4 text-sm font-medium transition-colors relative ${mode === "join" ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                                    }`}
                            >
                                Join Room
                                {mode === "join" && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                                    />
                                )}
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <AnimatePresence mode="wait">
                                {mode === "create" ? (
                                    <motion.div
                                        key="create"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex justify-center">
                                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                                                <Plus className="h-8 w-8 text-blue-400" />
                                            </div>
                                        </div>

                                        <div className="text-center space-y-2">
                                            <h3 className="text-lg font-medium text-white">Start a new session</h3>
                                            <p className="text-sm text-zinc-500">You'll get a code to share with friends.</p>
                                        </div>

                                        <Link href="/lobby" className="w-full rounded-xl bg-white py-3.5 text-sm font-medium text-black hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                                            Create Room
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="join"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex justify-center">
                                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center">
                                                <Users className="h-8 w-8 text-purple-400" />
                                            </div>
                                        </div>

                                        <div className="text-center space-y-2">
                                            <h3 className="text-lg font-medium text-white">Have a room code?</h3>
                                            <p className="text-sm text-zinc-500">Enter it below to join the party.</p>
                                        </div>

                                        <div className="space-y-3">
                                            <input
                                                type="text"
                                                placeholder="e.g. MOON-BASE"
                                                value={roomCode}
                                                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center text-lg tracking-widest text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all uppercase"
                                            />
                                            <button
                                                disabled={!roomCode}
                                                className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                Join Room
                                                <ArrowRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <p className="text-center text-xs text-zinc-600 mt-8">
                        By continuing, you agree to our Terms of Service.
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
