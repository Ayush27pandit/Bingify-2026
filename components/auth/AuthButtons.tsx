"use client";

import { loginWithEmail, loginWithGoogle, signupWithEmail } from "@/lib/auth";
import { useState } from "react";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function AuthButtons() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const tokenToServer = async (token: string) => {
    try {
      const response = await fetch("http://localhost:8000/auth/session", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await response.json();
      if (data.error) {
        console.error(data.error);
      }
      if (data.success) {
        router.push("/start");
        console.log("Received data from session:", data);
      }
    } catch {
      console.error("Failed to send token to server");
    }
  };
  const handleGoogle = async () => {
    try {
      setIsLoading(true);
      const token = await loginWithGoogle();

      //send token to serverh
      tokenToServer(token);

      console.log(token);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Ignore popup closed by user error
      if (error?.code === "auth/popup-closed-by-user") {
        console.log("Sign-in popup was closed by user");
        return;
      }
      console.error("Google login error:", error);
      alert(`Login failed: ${error?.message || "Please try again"}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }
    try {
      setIsLoading(true);
      const token =
        mode === "login"
          ? await loginWithEmail(email, password)
          : await signupWithEmail(email, password);

      //send token to server

      tokenToServer(token);

      console.log(`${mode} successful`, token);
    } catch (error) {
      console.error(`${mode} failed`, error);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      alert(`${mode} failed: ` + (error as any).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex p-1 bg-white/5 rounded-xl border border-white/10 relative">
        <motion.div
          className="absolute inset-y-1 bg-white rounded-lg shadow-sm"
          initial={false}
          animate={{
            x: mode === "login" ? 0 : "100%",
            width: "calc(50% - 4px)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
        <button
          onClick={() => setMode("login")}
          className={`relative z-10 flex-1 py-2 text-sm font-medium transition-colors ${
            mode === "login" ? "text-black" : "text-zinc-500 hover:text-white"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setMode("signup")}
          className={`relative z-10 flex-1 py-2 text-sm font-medium transition-colors ${
            mode === "signup" ? "text-black" : "text-zinc-500 hover:text-white"
          }`}
        >
          Sign Up
        </button>
      </div>

      <div className="space-y-4">
        <div className="relative group">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-white transition-colors" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
          />
        </div>
        <div className="relative group">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-white transition-colors" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 w-full bg-white hover:bg-zinc-200 text-black font-semibold py-3 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mode === "login" ? (
            <>
              <LogIn className="h-4 w-4" />
              Sign In
            </>
          ) : (
            <>
              <UserPlus className="h-4 w-4" />
              Create Account
            </>
          )}
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0A0A0C] px-2 text-zinc-500">
              Or continue with
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogle}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium py-3 rounded-xl transition-all active:scale-[0.98] backdrop-blur-sm"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            className="h-5 w-5"
            alt="Google"
          />
          Google Account
        </button>
      </div>
    </div>
  );
}
