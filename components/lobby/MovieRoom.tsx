"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { Maximize2, Mic, MicOff, Video, VideoOff, PhoneOff, Settings, Users, Play, Pause, SkipForward, SkipBack } from "lucide-react";
import MuxPlayer, { MuxPlayerRefAttributes } from "@mux/mux-player-react";
import { MediaItem } from "./MediaGrid";
import { useRoomConnection } from "@/lib/useRoomConnection";
import { socket } from "@/lib/socket";
import { useRef, useEffect } from "react";
import { auth } from "@/lib/firebase";

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
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [participants, setParticipants] = useState<any[]>([]);
    const [currentUserUid, setCurrentUserUid] = useState<string | null>(null);
    const playerRef = useRef<MuxPlayerRefAttributes>(null);

    // Get room meta to check if host
    const [isHost, setIsHost] = useState(false);
    useEffect(() => {
        const savedMeta = sessionStorage.getItem("roomMeta");
        if (savedMeta) {
            const meta = JSON.parse(savedMeta);
            if (meta.roomId === roomId && meta.hostToken) {
                setIsHost(true);
            }
        }

        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) setCurrentUserUid(user.uid);
        });
        return () => unsubscribe();
    }, [roomId]);

    //connecting room socket
    const { roomConnected } = useRoomConnection(roomId);

    // Sync Logic
    useEffect(() => {
        if (!roomConnected) return;

        const handlePlaybackState = (data: { state: string; offset: number; serverStartTime: string | null }) => {
            console.log("Received playback-state:", data);
            syncPlayer(data);
        };

        const handlePlaybackSync = (data: { state: string; offset: number; serverStartTime: string | null }) => {
            // Periodic sync - only adjust if drift is significant
            if (playerRef.current) {
                const targetTime = getTargetTime(data);
                const drift = Math.abs(playerRef.current.currentTime - targetTime);
                if (drift > 2) { // 2 seconds threshold for periodic sync to avoid jitter
                    console.log(`Drift detected: ${drift}s. Syncing...`);
                    playerRef.current.currentTime = targetTime;
                }
            }
        };

        const getTargetTime = (data: { state: string; offset: number; serverStartTime: string | null }) => {
            if (data.state === 'PLAYING' && data.serverStartTime) {
                const now = Date.now();
                const start = new Date(data.serverStartTime).getTime();
                const elapsedSinceStart = (now - start) / 1000;
                return data.offset + elapsedSinceStart;
            }
            return data.offset;
        };

        const syncPlayer = (data: { state: string; offset: number; serverStartTime: string | null }) => {
            if (!playerRef.current) return;

            const targetTime = getTargetTime(data);
            playerRef.current.currentTime = targetTime;

            if (data.state === 'PLAYING') {
                setHasStarted(true); // Hide "Start Movie" overlay for viewers when playback starts
                playerRef.current.play().catch(e => console.error("Auto-play failed:", e));
                setIsPlaying(true);
            } else {
                playerRef.current.pause();
                setIsPlaying(false);
            }
        };

        const handleRoomMembers = (members: any[]) => {
            console.log("Received room-members:", members);
            setParticipants(members);
        };

        const handleUserJoined = (user: any) => {
            console.log("User joined:", user);
            setParticipants(prev => {
                if (prev.find(p => p.id === user.userId)) return prev;
                return [...prev, { id: user.userId, name: user.userName, picture: user.userPicture }];
            });
        };

        const handleUserLeft = (data: { userId: string }) => {
            console.log("User left:", data);
            setParticipants(prev => prev.filter(p => p.id !== data.userId));
        };

        socket.on('playback-state', handlePlaybackState);
        socket.on('playback-sync', handlePlaybackSync);
        socket.on('room-members', handleRoomMembers);
        socket.on('user-joined', handleUserJoined);
        socket.on('user-left', handleUserLeft);

        return () => {
            socket.off('playback-state', handlePlaybackState);
            socket.off('playback-sync', handlePlaybackSync);
            socket.off('room-members', handleRoomMembers);
            socket.off('user-joined', handleUserJoined);
            socket.off('user-left', handleUserLeft);
        };
    }, [roomConnected]);

    // Host Actions
    const togglePlayPause = () => {
        if (!isHost || !playerRef.current) return;

        if (isPlaying) {
            socket.emit('playback-pause', { roomId, offset: playerRef.current.currentTime });
        } else {
            socket.emit('playback-play', { roomId, offset: playerRef.current.currentTime });
        }
    };

    const handleSeek = (newTime: number) => {
        if (!isHost) return;
        socket.emit('playback-seek', { roomId, offset: newTime });
    };

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        return [h, m, s].map(v => v < 10 ? "0" + v : v).filter((v, i) => v !== "00" || i > 0).join(":");
    };


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
                                        if (isHost) {
                                            socket.emit('playback-play', { roomId, offset: 0 });
                                        }
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
                            ref={playerRef}
                            playbackId={muxPlaybackId}
                            metadata={{
                                video_title: media.title
                            }}
                            className={`w-full h-full transition-opacity duration-700 ${isPlayerReady ? 'opacity-100' : 'opacity-0'} ${!isHost ? 'hide-controls' : ''}`}
                            onCanPlay={() => setIsPlayerReady(true)}
                            onTimeUpdate={(e) => {
                                if (playerRef.current) {
                                    setCurrentTime(playerRef.current.currentTime);
                                }
                            }}
                            onLoadedMetadata={(e) => {
                                if (playerRef.current) {
                                    setDuration(playerRef.current.duration);
                                }
                            }}
                            autoPlay={hasStarted}
                            accentColor="#2563eb"
                            style={!isHost ? { '--controls': 'none' } as any : {}}
                        />

                    </div>

                    {/* Custom Host Video Controls */}
                    {isHost && (
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex flex-col gap-4">
                                {/* Seek Bar */}
                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-medium text-white/70 w-12 text-right">{formatTime(currentTime)}</span>
                                    <input
                                        type="range"
                                        min={0}
                                        max={duration}
                                        value={currentTime}
                                        onChange={(e) => handleSeek(parseFloat(e.target.value))}
                                        className="flex-1 h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-blue-500"
                                    />
                                    <span className="text-xs font-medium text-white/70 w-12">{formatTime(duration)}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <button
                                            onClick={togglePlayPause}
                                            className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
                                        >
                                            {isPlaying ? <Pause className="h-6 w-6 fill-black" /> : <Play className="h-6 w-6 fill-black ml-1" />}
                                        </button>

                                        <div className="flex items-center gap-4">
                                            <button onClick={() => handleSeek(Math.max(0, currentTime - 10))} className="text-white/70 hover:text-white transition-colors">
                                                <SkipBack className="h-5 w-5" />
                                            </button>
                                            <button onClick={() => handleSeek(Math.min(duration, currentTime + 10))} className="text-white/70 hover:text-white transition-colors">
                                                <SkipForward className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <button className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-colors">
                                            <Maximize2 className="h-5 w-5 text-white" />
                                        </button>
                                        <div className="flex items-center gap-3">
                                            <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium backdrop-blur-md transition-colors">
                                                1080p
                                            </button>
                                            <Settings className="h-5 w-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Video Call Blocks Sidebar */}
                <div className="w-80 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-semibold flex items-center gap-2">
                            <Users className="h-4 w-4 text-blue-400" />
                            Participants <span className="bg-white/10 px-2 py-0.5 rounded text-[10px]">{participants.length}</span>
                        </h3>
                    </div>

                    {participants.map((user, i) => (
                        <motion.div
                            key={user.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="aspect-video bg-zinc-900 rounded-2xl relative overflow-hidden border border-white/5"
                        >
                            <div className="absolute inset-0 flex items-center justify-center">
                                {user.picture ? (
                                    <img src={user.picture} alt={user.name} className="w-full h-full object-cover opacity-50" />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                        {user.name?.charAt(0) || "U"}
                                    </div>
                                )}
                            </div>
                            <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/5">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[10px] text-white font-medium">
                                    {user.name} {user.id === currentUserUid ? "(You)" : ""}
                                </span>
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
                        {participants.slice(0, 3).map(user => (
                            <div key={user.id} title={user.name} className="w-8 h-8 rounded-full border-2 border-[#09090B] bg-zinc-800 flex items-center justify-center text-[10px] text-white font-bold ring-2 ring-blue-500/20">
                                {user.name?.charAt(0) || "U"}
                            </div>
                        ))}
                        {participants.length > 3 && (
                            <div className="w-8 h-8 rounded-full border-2 border-[#09090B] bg-zinc-800 flex items-center justify-center text-[10px] text-white font-bold ring-2 ring-blue-500/20">
                                +{participants.length - 3}
                            </div>
                        )}
                    </div>
                    <Settings className="h-5 w-5 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
                </div>
            </motion.div>
        </div>
    );
}
