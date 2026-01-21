"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { firebaseLogout } from "@/lib/auth";
import { LogOut, User as UserIcon } from "lucide-react";
import Link from "next/link";

export function Header() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [auth]);

    const handleLogout = async () => {
        try {
            // 1. Clear backend session
            await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/logout`, {
                method: "POST",
                credentials: "include",
            });

            // 2. Clear Next.js session cookie (Server Action / API Route)
            await fetch("/api/logout", {
                method: "POST",
            });

            // 3. Clear session storage
            sessionStorage.removeItem("roomMeta");
            sessionStorage.removeItem("firebaseIdToken");

            // 3. Firebase logout
            await firebaseLogout();

            // Clear cookies manually just in case they are not HttpOnly
            document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";

            // 4. Force Reload/Redirect to ensure middleware sees the cleared cookie
            setTimeout(() => {
                window.location.assign("/auth");
            }, 100);
        } catch (error) {
            console.error("Logout failed", error);
            window.location.assign("/auth");
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/start" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">B</span>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        Bingify
                    </span>
                </Link>

                {/* User Profile & Logout */}
                <div className="flex items-center gap-4">
                    {user && (
                        <div className="hidden md:flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pl-2 pr-4 py-1.5 backdrop-blur-md">
                            {user.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt={user.displayName || "User"}
                                    className="w-8 h-8 rounded-full border border-white/20"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-white/10">
                                    <UserIcon className="w-4 h-4 text-blue-400" />
                                </div>
                            )}
                            <span className="text-sm font-medium text-zinc-200">
                                {user.displayName || user.email?.split('@')[0] || "User"}
                            </span>
                        </div>
                    )}

                    <button
                        onClick={handleLogout}
                        className="p-2 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all group"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>
        </header>
    );
}
