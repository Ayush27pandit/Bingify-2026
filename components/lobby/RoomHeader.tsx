"use client";

import { useState } from "react";
import { Copy, Check, Shield, Eye, EyeOff, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface RoomHeaderProps {
    roomId: string;
    roomPassword?: string;
    onLeave?: () => void;
}

export function RoomHeader({ roomId, roomPassword = "••••••", onLeave }: RoomHeaderProps) {
    const [copiedId, setCopiedId] = useState(false);
    const [copiedPass, setCopiedPass] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const copyToClipboard = (text: string, setCopied: (val: boolean) => void) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-[#0A0A0C]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40"
        >
            <div className="container mx-auto px-6 py-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-medium text-zinc-400">Room Ready</span>
                    </div>

                    {/* Credentials */}
                    <div className="flex items-center gap-3 sm:gap-6 bg-white/5 rounded-full px-6 py-2 border border-white/5">

                        {/* Room ID */}
                        <div className="flex items-center gap-3 pr-4 border-r border-white/10">
                            <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">ID</span>
                            <span className="font-mono text-white tracking-wider">{roomId}</span>
                            <button
                                onClick={() => copyToClipboard(roomId, setCopiedId)}
                                className="text-zinc-500 hover:text-white transition-colors"
                                title="Copy Room ID"
                            >
                                {copiedId ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                            </button>
                        </div>

                        {/* Password */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">PASS</span>
                            <span className="font-mono text-white tracking-wider min-w-[60px]">
                                {showPassword ? roomPassword : "••••••"}
                            </span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-zinc-500 hover:text-white transition-colors"
                                    title={showPassword ? "Hide Password" : "Show Password"}
                                >
                                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                </button>
                                <button
                                    onClick={() => copyToClipboard(roomPassword, setCopiedPass)}
                                    className="text-zinc-500 hover:text-white transition-colors"
                                    title="Copy Password"
                                >
                                    {copiedPass ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button className="hidden md:flex text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                            Share invite link
                        </button>
                        <button
                            onClick={onLeave}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all text-sm font-medium group"
                        >
                            <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Leave Room
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
