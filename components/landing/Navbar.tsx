"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";
import { firebaseLogout } from "@/lib/auth";
import { redirect, useRouter } from "next/navigation";

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Community", href: "#testimonials" },
  { label: "Support", href: "#support" },
];

export function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    // 1️⃣ Clear backend session
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    // 2️⃣ Sign out Firebase client
    await firebaseLogout();

    // 3️⃣ Redirect
    router.replace("/login");
  };
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: EASE_EXPO }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-6 mt-4">
        <div className="mx-auto max-w-6xl rounded-full border border-white/10 bg-black/40 backdrop-blur-xl backdrop-saturate-150 px-6 py-3 shadow-lg shadow-black/20">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-white">
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-black" />
                  <div className="h-1.5 w-1.5 rounded-full bg-black" />
                  <div className="h-1.5 w-1.5 rounded-full bg-black" />
                  <div className="h-1.5 w-1.5 rounded-full bg-black" />
                </div>
              </div>
              <span className="text-base font-semibold italic text-white tracking-tight">
                Bingify
              </span>
            </Link>

            {/* Center Nav Links */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <Link
                href="/auth"
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Login
              </Link>
              <button
                onClick={() => redirect("/auth")}
                className="rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
