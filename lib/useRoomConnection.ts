import { useEffect, useState } from "react";
import { socket } from "./socket";

export function useRoomConnection(roomId: string) {
  const [roomConnected, setRoomConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId) return;

    // Emit join-room event to server
    socket.emit("join-room", { roomId }, (response: any) => {
      if (response?.success) {
        console.log(`Joined room: ${roomId}`);
        setRoomConnected(true);
        setError(null);
      } else {
        console.error("Failed to join room:", response?.error);
        setError(response?.error || "Failed to join room");
        setRoomConnected(false);
      }
    });

    // Listen for room-specific events
    const handleRoomError = (data: any) => {
      console.error("Room error:", data);
      setError(data?.message || "Room connection error");
    };

    socket.on("room-error", handleRoomError);

    // Cleanup: leave room when component unmounts
    return () => {
      socket.emit("leave-room", { roomId });
      socket.off("room-error", handleRoomError);
      setRoomConnected(false);
    };
  }, [roomId]);

  return { roomConnected, error };
}
