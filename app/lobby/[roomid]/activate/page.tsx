"use client";

import { useEffect, useState, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MovieRoom } from "@/components/lobby/MovieRoom";
import { MediaItem } from "@/components/lobby/MediaGrid";
import { getAuthHeader } from "@/lib/auth-token";
import { useRoomConnection } from "@/lib/useRoomConnection";
import { useRoomNotifications } from "@/lib/useRoomNotifications";
import { Header } from "@/components/shared/Header";
import { RoomNotifications } from "@/components/shared/RoomNotifications";
import { useSocketConnection } from "@/lib/useSocketConnection";

interface RoomMeta {
  roomId: string;
  roomPassword: string;
  muxAccessId: string;
  muxPlaybackId: string;
  hostToken: string;
  joinToken: string;
}

export default function ActivatePage({
  params,
}: {
  params: Promise<{ roomid: string }>;
}) {
  const { roomid } = use(params);
  const searchParams = useSearchParams();
  const movieId = searchParams.get("movieId");
  const router = useRouter();
  const { isConnected, isConnecting } = useSocketConnection();

  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [roomMeta, setRoomMeta] = useState<RoomMeta | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Check hydration and room meta
  useEffect(() => {
    const saved = sessionStorage.getItem("roomMeta");
    if (saved) {
      setRoomMeta(JSON.parse(saved));
    }
    setIsHydrated(true);
  }, []);

  // Redirect if not authenticated/joined
  useEffect(() => {
    if (isHydrated && !roomMeta) {
      // If we don't have local room meta, we should probably redirect to start or auth
      // For now, redirecting to the lobby main page to re-initiate might be safer,
      // or /start if completely lost.
      // However, if the user just refreshed and has session, they should be fine.
      // If they really have NO data, go to start.
      router.push("/auth");
    }
  }, [isHydrated, roomMeta, router]);

  // Connect to room socket
  const { roomConnected, error } = useRoomConnection(roomid);

  // Room notifications (user joined/left)
  const { notifications, removeNotification } = useRoomNotifications();

  // Fetch movie details
  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return;

      try {
        const authHeader = await getAuthHeader();
        // We fetch the whole library and find the movie since we don't have a direct get-movie endpoint visible
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/protected/movie-library`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              ...authHeader,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          const movies: MediaItem[] = data.movies;
          const match = movies.find((m) => m.id === movieId);
          if (match) {
            setSelectedMedia(match);
          } else {
            console.error("Movie not found in library");
          }
        }
      } catch (err) {
        console.error("Error fetching movie details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isHydrated && movieId) {
      fetchMovie();
    } else if (isHydrated && !movieId) {
      setIsLoading(false);
    }
  }, [isHydrated, movieId]);

  if (!isHydrated || isLoading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
          <p className="text-zinc-400 text-sm animate-pulse">
            Loading theater...
          </p>
        </div>
      </div>
    );
  }

  if (!selectedMedia) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center flex-col gap-4">
        <p className="text-zinc-400">Movie not found or no movie selected.</p>
        <button
          onClick={() => router.push(`/lobby/${roomid}`)}
          className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm transition-colors"
        >
          Back to Lobby
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090B] relative overflow-hidden font-sans selection:bg-blue-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-[#09090B] to-[#09090B] pointer-events-none" />
      <Header />
      {roomConnected && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full text-sm text-zinc-300 backdrop-blur-md">
          Connected to room
        </div>
      )}

      {/* Room Notifications (user joined/left toasts) */}
      <RoomNotifications notifications={notifications} onDismiss={removeNotification} />

      <div className="relative z-10">
        <MovieRoom
          media={selectedMedia}
          roomId={roomid}
          roomPassword={roomMeta?.roomPassword}
          muxAssetId={selectedMedia.muxAssetId}
          muxPlaybackId={selectedMedia.muxPlaybackId}
          onLeave={() => router.push("/start")}
        />
      </div>
    </main>
  );
}
