"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoSrc?: string; // Optional, defaults to a placeholder if not provided
}

export function VideoModal({ isOpen, onClose, videoSrc }: VideoModalProps) {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: 10 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-full max-w-5xl rounded-2xl bg-[#0A0A0C] border border-white/10 shadow-2xl pointer-events-auto overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {/* Video Player (Mockup for now, placeholder) */}
                            <div className="aspect-video w-full bg-black relative flex items-center justify-center">
                                {/* 
                    If we had a real video URL, we'd use <video> or <iframe> here.
                    For now, showing a high-fidelity "Player" UI placeholder.
                 */}
                                <div className="text-center">
                                    <div className="mb-4 text-zinc-500 font-mono text-sm tracking-widest">DEMO_VIDEO.mp4</div>
                                    <div className="h-16 w-16 mx-auto rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                                        <div className="h-0 w-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                                    </div>
                                </div>

                                {/* Fake Progress Bar */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                                    <div className="h-full w-1/3 bg-blue-500 relative">
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full shadow" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
