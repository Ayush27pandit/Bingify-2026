"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { ParticleBackground } from "@/components/landing/ParticleBackground";
import { RoomHeader } from "@/components/lobby/RoomHeader";
import { MediaGrid, MediaItem } from "@/components/lobby/MediaGrid";
import { MediaFilters } from "@/components/lobby/MediaFilters";
import { Play, Loader, AlertCircle } from "lucide-react";
import { firebaseLogout } from "@/lib/auth";
import { useSocketConnection } from "@/lib/useSocketConnection";
import { useRoomConnection } from "@/lib/useRoomConnection";
import { useRouter } from "next/navigation";

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const DUMMY_MEDIA: MediaItem[] = [
  {
    id: "1",
    title: "Interstellar",
    image: "https://image.tmdb.org/t/p/w500/gEU2QniL6C8zEfVIuM8nCRm83w2.jpg",
    year: "2014",
    genre: "Sci-Fi",
    duration: "2h 49m",
  },
  {
    id: "2",
    title: "Dune: Part Two",
    image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    year: "2024",
    genre: "Sci-Fi",
    duration: "2h 46m",
  },
  {
    id: "3",
    title: "Oppenheimer",
    image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    year: "2023",
    genre: "Drama",
    duration: "3h 00m",
  },
  {
    id: "4",
    title: "The Batman",
    image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    year: "2022",
    genre: "Action",
    duration: "2h 56m",
  },
  {
    id: "5",
    title: "Blade Runner 2049",
    image: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    year: "2017",
    genre: "Sci-Fi",
    duration: "2h 44m",
  },
  {
    id: "6",
    title: "Arrival",
    image: "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63C3cRtHPqqSIwb.jpg",
    year: "2016",
    genre: "Sci-Fi",
    duration: "1h 56m",
  },
  {
    id: "7",
    title: "Inception",
    image: "https://image.tmdb.org/t/p/w500/9gk7admal4ZLVD9NdWh0nEmzAde.jpg",
    year: "2010",
    genre: "Sci-Fi",
    duration: "2h 28m",
  },
  {
    id: "8",
    title: "Everything Everywhere All At Once",
    image: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
    year: "2022",
    genre: "Adventure",
    duration: "2h 19m",
  },
];

const GENRES = ["Action", "Sci-Fi", "Drama", "Adventure"];

interface RoomMeta {
  roomId: string;
  roomPassword: string;
  hostToken: string;
  joinToken: string;
}

export default function LobbyPage() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const router = useRouter();
  const { isConnected, isConnecting } = useSocketConnection();

  const [roomMeta, setRoomMeta] = useState<RoomMeta | null>(() => {
    const saved = sessionStorage.getItem("roomMeta");
    return saved ? JSON.parse(saved) : null;
  });

  const roomId = roomMeta?.roomId ?? null;
  const joinToken = roomMeta?.joinToken ?? null;
  const hostToken = roomMeta?.hostToken ?? null;

  useEffect(() => {
    if (!roomMeta) {
      router.push("/start");
    }
  }, [roomMeta, router]);
  // Room connection

  //getting room id from session storage

  const ROOM_ID = roomId!; // Replace with dynamic room ID from URL params later
  const { roomConnected, error } = useRoomConnection(ROOM_ID);

  // Filter Logic
  const filteredMedia = useMemo(() => {
    return DUMMY_MEDIA.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesGenre =
        selectedGenre === "All" || item.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre]);

  // Mock starting a session
  const handleStartSession = () => {
    alert(`Starting session for: ${selectedMedia?.title} (Demo)`);
  };
  const handleLogout = async () => {
    // 1️⃣ Clear backend session
    await fetch("http://localhost:8000/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    // 2️⃣ Sign out Firebase client
    await firebaseLogout();

    // 3️⃣ Redirect
    router.replace("/auth");
  };
  return (
    <main className="min-h-screen bg-[#09090B] relative overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Backgrounds */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
        <div className="absolute inset-0 bg-linear-to-b from-blue-950/20 via-transparent to-purple-950/10 pointer-events-none" />
      </div>

      {/* Connection Status Indicator */}
      {isConnecting && !isConnected && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
          <Loader className="h-4 w-4 animate-spin text-yellow-400" />
          <span className="text-sm text-yellow-300">Reconnecting...</span>
        </div>
      )}

      {isConnected && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-green-300">Connected</span>
        </div>
      )}

      {/* Room Error */}
      {error && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <span className="text-sm text-red-300">{error}</span>
        </div>
      )}

      {/* Room Connected */}
      {roomConnected && !error && (
        <div className="fixed top-16 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg">
          <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse" />
          <span className="text-sm text-blue-300">Joined room: {ROOM_ID}</span>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        {/* Room Header - Credentials */}
        <div className="mt-20 flex gap-5">
          <RoomHeader roomId={ROOM_ID} roomPassword={roomMeta?.roomPassword} />
          <button onClick={handleLogout}>Logout </button>
        </div>

        {/* Content Area */}
        <div className="container mx-auto px-6 py-12 flex-1 flex flex-col">
          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2">
              What should we watch?
            </h1>
            <p className="text-zinc-400">Pick a movie to start the room.</p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_EXPO, delay: 0.15 }}
          >
            <MediaFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedGenre={selectedGenre}
              setSelectedGenre={setSelectedGenre}
              genres={GENRES}
            />
          </motion.div>

          {/* Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.2 }}
            className="pb-32"
          >
            <MediaGrid
              items={filteredMedia}
              onSelect={setSelectedMedia}
              selectedId={selectedMedia?.id || null}
            />
          </motion.div>
        </div>

        {/* Floating Lower Bar (Action Bar) */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 z-50 p-6 pointer-events-none"
            >
              <div className="container mx-auto max-w-3xl pointer-events-auto">
                <div className="bg-[#0A0A0C]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-2xl shadow-black/50">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-8 bg-zinc-800 rounded overflow-hidden relative">
                      <img
                        src={selectedMedia.image}
                        className="object-cover h-full w-full"
                        alt=""
                      />
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-zinc-400 uppercase tracking-wider font-medium">
                        Selected
                      </div>
                      <div className="text-sm font-semibold text-white truncate max-w-37.5 sm:max-w-xs">
                        {selectedMedia.title}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleStartSession}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
                  >
                    Start watching
                    <Play className="h-4 w-4 fill-current" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
