import { io } from "socket.io-client";

export const socket = io("http://localhost:8000", {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
});

// Global error handling
socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error);
});

socket.on("disconnect", (reason) => {
  console.warn("Socket disconnected:", reason);
  // reason can be: "io server disconnect", "io client disconnect", "ping timeout", "transport close", "transport error"
});

socket.on("reconnect_attempt", () => {
  console.log("Attempting to reconnect...");
});

socket.on("reconnect", () => {
  console.log("Successfully reconnected!");
});
