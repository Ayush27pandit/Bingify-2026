import { useEffect, useState, useCallback } from "react";
import { socket } from "./socket";

export interface RoomNotification {
    id: string;
    type: "user-joined" | "user-left" | "info" | "error";
    userName: string;
    message: string;
    timestamp: number;
}

export function useRoomNotifications() {
    const [notifications, setNotifications] = useState<RoomNotification[]>([]);

    const addNotification = useCallback((notification: Omit<RoomNotification, "id" | "timestamp">) => {
        setNotifications((prev) => {
            // Deduplicate: check if a similar notification was added in the last 2 seconds
            const now = Date.now();
            const isDuplicate = prev.some(n =>
                n.type === notification.type &&
                n.userName === notification.userName &&
                n.message === notification.message &&
                now - n.timestamp < 2000
            );

            if (isDuplicate) return prev;

            const newNotification: RoomNotification = {
                ...notification,
                id: `${now}-${Math.random().toString(36).substr(2, 9)}`,
                timestamp: now,
            };

            // Auto-remove after 4 seconds
            setTimeout(() => {
                setNotifications((current) => current.filter((n) => n.id !== newNotification.id));
            }, 4000);

            return [...prev, newNotification];
        });
    }, []);

    const removeNotification = useCallback((id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    useEffect(() => {
        const handleUserJoined = (data: { userId: string; userName: string; message: string }) => {
            console.log("User joined event received:", data);
            addNotification({
                type: "user-joined",
                userName: data.userName || "Someone",
                message: data.message || "joined the room",
            });
        };

        const handleUserLeft = (data: { userId: string; userName: string }) => {
            console.log("User left event received:", data);
            addNotification({
                type: "user-left",
                userName: data.userName || "Someone",
                message: "left the room",
            });
        };

        socket.on("user-joined", handleUserJoined);
        socket.on("user-left", handleUserLeft);

        return () => {
            socket.off("user-joined", handleUserJoined);
            socket.off("user-left", handleUserLeft);
        };
    }, [addNotification]);

    return { notifications, removeNotification, addNotification };
}
