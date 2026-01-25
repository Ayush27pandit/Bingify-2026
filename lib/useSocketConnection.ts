import { useEffect, useState } from "react";
import { socket } from "./socket";

export function useSocketConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(!socket.connected);


  useEffect(() => {
    console.log("useSocketConnection hook mounted");

    // Check if already connected
    if (socket.connected) {
      console.log("Socket already connected:", socket.id);
      setIsConnected(true);
      setIsConnecting(false);
    } else {
      socket.connect();
    }

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
      setIsConnected(true);
      setIsConnecting(false);
    };

    const handleDisconnect = () => {
      console.log("Socket disconnected");
      setIsConnected(false);
      setIsConnecting(true);
    };

    const handleConnectError = (error: any) => {
      console.error("Socket connection error:", error);
      setIsConnecting(true);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);

    return () => {
      console.log("useSocketConnection hook unmounting");
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
    };
  }, []);

  return { isConnected, isConnecting };
}
