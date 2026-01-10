import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bingify - Synchronized Movie Watching",
  description: "The professional standard for shared cinema experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0A0A0A] text-slate-200 antialiased selection:bg-blue-500/20`}>
        {children}
      </body>
    </html>
  );
}
