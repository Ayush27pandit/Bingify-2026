"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus, UserMinus, Info, AlertCircle } from "lucide-react";
import { RoomNotification } from "@/lib/useRoomNotifications";

interface RoomNotificationsProps {
    notifications: RoomNotification[];
    onDismiss: (id: string) => void;
}

export function RoomNotifications({ notifications, onDismiss }: RoomNotificationsProps) {
    const getNotificationStyles = (type: RoomNotification["type"]) => {
        switch (type) {
            case "user-joined":
                return {
                    bg: "bg-emerald-500/10",
                    border: "border-emerald-500/30",
                    icon: <UserPlus className="h-4 w-4 text-emerald-400" />,
                    accent: "text-emerald-400",
                };
            case "user-left":
                return {
                    bg: "bg-amber-500/10",
                    border: "border-amber-500/30",
                    icon: <UserMinus className="h-4 w-4 text-amber-400" />,
                    accent: "text-amber-400",
                };
            case "error":
                return {
                    bg: "bg-red-500/10",
                    border: "border-red-500/30",
                    icon: <AlertCircle className="h-4 w-4 text-red-400" />,
                    accent: "text-red-400",
                };
            default:
                return {
                    bg: "bg-blue-500/10",
                    border: "border-blue-500/30",
                    icon: <Info className="h-4 w-4 text-blue-400" />,
                    accent: "text-blue-400",
                };
        }
    };

    return (
        <div className="fixed top-24 right-4 z-[100] flex flex-col gap-3 max-w-sm pointer-events-none">
            <AnimatePresence mode="popLayout">
                {notifications.map((notification) => {
                    const styles = getNotificationStyles(notification.type);
                    return (
                        <motion.div
                            key={notification.id}
                            layout
                            initial={{ opacity: 0, x: 100, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className={`
                pointer-events-auto
                flex items-center gap-3 px-4 py-3
                ${styles.bg} ${styles.border}
                border rounded-xl backdrop-blur-xl
                shadow-lg shadow-black/20
              `}
                        >
                            {/* Icon */}
                            <div className="flex-shrink-0">
                                {styles.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-white">
                                    <span className={`font-semibold ${styles.accent}`}>
                                        {notification.userName}
                                    </span>{" "}
                                    <span className="text-zinc-300">{notification.message}</span>
                                </p>
                            </div>

                            {/* Dismiss Button */}
                            <button
                                onClick={() => onDismiss(notification.id)}
                                className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <X className="h-3.5 w-3.5 text-zinc-400 hover:text-white" />
                            </button>

                            {/* Progress bar */}
                            <motion.div
                                className={`absolute bottom-0 left-0 h-0.5 ${styles.accent.replace("text-", "bg-")} rounded-full`}
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{ duration: 4, ease: "linear" }}
                            />
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
