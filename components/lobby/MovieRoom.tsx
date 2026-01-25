"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { Maximize2, Mic, MicOff, Video, VideoOff, PhoneOff, Settings, Users, Play } from "lucide-react";
import MuxPlayer from "@mux/mux-player-react";
import { MediaItem } from "./MediaGrid";
import { useRoomConnection } from "@/lib/useRoomConnection";

interface MovieRoomProps {
    media: MediaItem;
    roomId: string;
    roomPassword?: string;
    muxPlaybackId: string;
    muxAssetId: string;
    onLeave: () => void;
}

export function MovieRoom({ media, roomId, roomPassword, muxPlaybackId, muxAssetId, onLeave }: MovieRoomProps) {
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    //connecting room socket
    const { roomConnected, error } = useRoomConnection(roomId);


    return (
        <div className="flex flex-col h-[calc(100vh-80px)] mt-20 gap-6 px-6 pb-6 overflow-hidden">
            {roomConnected ? (
                <div>user connected</div>
            ) : (
                <div>user not connected</div>
            )}
            <div className="flex flex-1 gap-6 min-h-0">

                {/* Main Video Screen */}
                <motion.div

                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 relative bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/5 group"
                >
                    {/* Placeholder for Mux Player / Video */}
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/50">
                        {/* Till video is not ready show thumbnail*/}
                        {!isPlayerReady && (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900">
                                <img
                                    src={media.thumbnailUrl}
                                    className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-20"
                                    alt=""
                                />
                                <div className="relative text-center">
                                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                        <Maximize2 className="text-white h-8 w-8" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2">{media.title}</h2>
                                    <p className="text-zinc-400">Loading stream...</p>
                                </div>
                            </div>
                        )}
                        {/* Start Button Overlay */}
                        {isPlayerReady && !hasStarted && (
                            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setHasStarted(true);
                                        // Auto-play will be handled by prop or state effect if needed, 
                                        // or we can just rely on the user clicking play on the player if we don't force it.
                                        // But typically "Start Movie" implies immediate playback.
                                        // We will leave the actual .play() call to the user interaction with the player 
                                        // OR if we had a ref we could call it. 
                                        // For now, removing the overlay reveals the player. 
                                        // If we want it to actually start playing, we should use autoPlay={hasStarted} effectively.
                                    }}
                                    className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] transition-shadow"
                                >
                                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                                    </div>
                                    Start Movie
                                </motion.button>
                            </div>
                        )}

                        <MuxPlayer
                            playbackId={muxPlaybackId}
                            metadata={{
                                video_title: media.title
                            }}
                            className={`w-full h-full transition-opacity duration-700 ${isPlayerReady ? 'opacity-100' : 'opacity-0'}`}
                            onCanPlay={() => setIsPlayerReady(true)}
                            autoPlay={hasStarted}
                            accentColor="#2563eb"
                        />

                    </div>

                    {/* Video Controls Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-colors">
                                    <Maximize2 className="h-5 w-5 text-white" />
                                </button>
                                <div className="h-1.5 w-64 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full w-1/3 bg-blue-500 rounded-full" />
                                </div>
                                <span className="text-sm font-medium text-white/70">12:45 / 1:52:00</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium backdrop-blur-md transition-colors">
                                    1080p
                                </button>
                                <Settings className="h-5 w-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Video Call Blocks Sidebar */}
                <div className="w-80 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-semibold flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-400" />
                            Participants <span className="bg-white/10 px-2 py-0.5 rounded text-[10px]">3</span>
                        </h3>
                    </div>

                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="aspect-video bg-zinc-900 rounded-2xl relative overflow-hidden border border-white/5"
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                    {i === 1 ? "Y" : i === 2 ? "A" : "S"}
                                </div>
                            </div>
                            <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[10px] text-white font-medium">
                                    {i === 1 ? "You (Host)" : i === 2 ? "Alex Morgan" : "Sarah J."}
                                </span>
                            </div>
                            <div className="absolute top-3 right-3 flex flex-col gap-2">
                                <div className="p-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/5">
                                    {i % 2 === 0 ? <MicOff className="h-3 w-3 text-red-400" /> : <Mic className="h-3 w-3 text-white/70" />}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Add more placeholder blocks if needed */}
                    <div className="flex-1 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center gap-2 text-zinc-600 hover:text-zinc-500 hover:bg-white/5 transition-all cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                            <Users className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-medium">Invite User</span>
                    </div>
                </div>
            </div>

            {/* Control Bar */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="h-20 bg-zinc-900/50 backdrop-blur-2xl border border-white/10 rounded-3xl flex items-center justify-between px-8 shadow-2xl"
            >
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <Play className="h-5 w-5 text-blue-400 fill-blue-400" />
                    </div>
                    <div>
                        <div className="text-white text-sm font-semibold truncate max-w-[200px]">{media.title}</div>
                        <div className="flex items-center gap-2">
                            <div className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold bg-white/5 px-2 py-0.5 rounded">ID: {roomId}</div>
                            {roomPassword && (
                                <div className="text-blue-400 text-[10px] uppercase tracking-wider font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">PASS: {roomPassword}</div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="h-12 w-12 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group">
                        <Mic className="h-5 w-5 text-white/70 group-hover:text-white" />
                    </button>
                    <button className="h-12 w-12 rounded-2xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group">
                        <Video className="h-5 w-5 text-white/70 group-hover:text-white" />
                    </button>
                    <div className="w-px h-8 bg-white/10 mx-2" />
                    <button
                        onClick={onLeave}
                        className="px-6 h-12 rounded-2xl bg-red-500 hover:bg-red-600 flex items-center gap-2 text-white font-semibold transition-all shadow-lg shadow-red-500/20"
                    >
                        <PhoneOff className="h-4 w-4" />
                        Leave Room
                    </button>
                </div>

                <div className="flex items-center gap-4 w-[200px] justify-end">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#09090B] bg-zinc-800 flex items-center justify-center text-[10px] text-white font-bold ring-2 ring-blue-500/20">
                                {i === 1 ? "Y" : i === 2 ? "A" : "S"}
                            </div>
                        ))}
                    </div>
                    <Settings className="h-5 w-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                </div>
            </motion.div>
        </div>
    );
}
