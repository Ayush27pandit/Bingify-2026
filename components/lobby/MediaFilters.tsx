"use client";

import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

interface MediaFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedGenre: string;
    setSelectedGenre: (genre: string) => void;
    genres: string[];
}

export function MediaFilters({
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    genres
}: MediaFiltersProps) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies..."
                    className="w-full h-12 rounded-xl bg-white/5 border border-white/10 pl-11 pr-12 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 text-zinc-500 hover:text-white transition-all"
                    >
                        <X className="h-3 w-3" />
                    </button>
                )}
            </div>

            {/* Genre Chips */}
            <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setSelectedGenre("All")}
                        className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${selectedGenre === "All"
                                ? "bg-white text-black border-white"
                                : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
                            }`}
                    >
                        All
                    </button>
                    {genres.map((genre) => (
                        <button
                            key={genre}
                            onClick={() => setSelectedGenre(genre)}
                            className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${selectedGenre === genre
                                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-600/20"
                                    : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
