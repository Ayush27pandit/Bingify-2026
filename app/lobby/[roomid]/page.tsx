"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/shared/Header";

import { RoomHeader } from "@/components/lobby/RoomHeader";
import { MediaGrid, MediaItem } from "@/components/lobby/MediaGrid";
import { MediaFilters } from "@/components/lobby/MediaFilters";
import { Play, Loader, AlertCircle } from "lucide-react";
import { useSocketConnection } from "@/lib/useSocketConnection";
import { useRoomConnection } from "@/lib/useRoomConnection";
import { useRouter } from "next/navigation";
import { getAuthHeader } from "@/lib/auth-token";
import { MovieRoom } from "@/components/lobby/MovieRoom";

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];



const GENRES = [
  "Action",
  "Sci-Fi",
  "Drama",
  "Adventure",
  "Romance",
  "Comedy",
  "Horror",
  "Thriller",
  "Fantasy",
  "Animation",
  "Documentary",
];

interface RoomMeta {
  roomId: string;
  roomPassword: string;
  muxAccessId: string;
  muxPlaybackId: string;
  hostToken: string;
  joinToken: string;
}

export default function LobbyPage() {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const router = useRouter();
  const { isConnected, isConnecting } = useSocketConnection();
  const [movieLibrary, setMovieLibrary] = useState<MediaItem[]>([]);


  const [roomMeta, setRoomMeta] = useState<RoomMeta | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("roomMeta");
    if (saved) {
      setRoomMeta(JSON.parse(saved));
    }
    setIsHydrated(true);
  }, []);

  const ROOM_ID = roomMeta?.roomId || "";

  useEffect(() => {
    if (isHydrated && !roomMeta) {
      router.push("/auth");
    }
  }, [isHydrated, roomMeta, router]);
  // Room connection

  useEffect(() => {
    const fetchMovies = async () => {
      if (!isHydrated || !ROOM_ID) return;
      try {
        const authHeader = await getAuthHeader();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/movie-library`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ...authHeader,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched movies, Movies Count=", data.count);
          setMovieLibrary(data.movies);
        } else {
          console.error("Failed to fetch movies:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [ROOM_ID]);



  // Room connection status
  const { roomConnected, error } = useRoomConnection(ROOM_ID);

  // Filter Logic
  const filteredMedia = useMemo(() => {
    return movieLibrary.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesGenre =
        selectedGenre === "All" || item.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [movieLibrary, searchQuery, selectedGenre]);



  // Mock starting a session
  const handleStartSession = async () => {
    if (!selectedMedia || !ROOM_ID) return;

    try {
      const authHeader = await getAuthHeader();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/activate-room`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader,
        },
        body: JSON.stringify({
          roomId: ROOM_ID,
          movieId: selectedMedia.id

        })
      });

      if (response.ok) {
        router.push(`/lobby/${ROOM_ID}/activate?movieId=${selectedMedia.id}`);
      } else {
        console.warn("Backend activation failed, but proceeding for demo");
        router.push(`/lobby/${ROOM_ID}/activate?movieId=${selectedMedia.id}`);
      }
    } catch (error) {
      console.error("Error activating room:", error);
      // Fallback for demo if backend endpoint doesn't exist yet
      router.push(`/lobby/${ROOM_ID}/activate?movieId=${selectedMedia.id}`);
    }
  };

  return (
    <main className="min-h-screen bg-[#09090B] relative overflow-hidden font-sans selection:bg-blue-500/30">
      {/* Backgrounds */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-b from-blue-950/20 via-transparent to-purple-950/10 pointer-events-none" />
      </div>

      {/* Connection Status Indicator */}
      {isHydrated && isConnecting && !isConnected && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/50 rounded-lg">
          <Loader className="h-4 w-4 animate-spin text-yellow-400" />
          <span className="text-sm text-yellow-300">Reconnecting...</span>
        </div>
      )}

      {isHydrated && isConnected && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg">
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-green-300">Connected</span>
        </div>
      )}

      {/* Room Error */}
      {isHydrated && error && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <span className="text-sm text-red-300">{error}</span>
        </div>
      )}

      {/* Room Connected */}
      {isHydrated && roomConnected && !error && (
        <div className="fixed top-16 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg">
          <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse" />
          <span className="text-sm text-blue-300">Joined room: {ROOM_ID}</span>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        {/* Content Area */}
        <div className="mt-20 flex gap-5">
          <RoomHeader roomId={ROOM_ID} roomPassword={roomMeta?.roomPassword} />

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
                        src={selectedMedia.thumbnailUrl}
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
    </main >
  );
}
