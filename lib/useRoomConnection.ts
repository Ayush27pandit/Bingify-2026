import { useEffect, useState } from "react";
import { socket } from "./socket";

export function useRoomConnection(roomId: string) {
  const [roomConnected, setRoomConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId) return;

    // Emit join-room event to server with  hostToken
    const savedMeta = sessionStorage.getItem("roomMeta");
    const roomMeta = savedMeta ? JSON.parse(savedMeta) : null;
    const hostToken = roomMeta?.roomId === roomId ? roomMeta.hostToken : undefined;

    console.log("Emitting join-room for:", roomId, hostToken ? "(with host token)" : "");
    socket.emit("join-room", { roomId, hostToken }, (response: any) => {
      console.log("join-room response for", roomId, ":", response);
      if (response?.success) {
        console.log(`Successfully joined room: ${roomId}`);
        setRoomConnected(true);
        setError(null);
      } else {
        console.error("Failed to join room:", response?.error);
        setError(response?.error || "Failed to join room");
        setRoomConnected(false);
      }
    });


    const handleRoomError = (data: any) => {
      console.error("Room error:", data);
      setError(data?.message || "Room connection error");
    };

    socket.on("room-error", handleRoomError);

    //cleanup
    return () => {
      socket.emit("leave-room", { roomId });
      socket.off("room-error", handleRoomError);
      setRoomConnected(false);
    };
  }, [roomId]);

  return { roomConnected, error };
}
