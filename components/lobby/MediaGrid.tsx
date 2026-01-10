"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";

export interface MediaItem {
    id: string;
    title: string;
    image: string;
    year: string;
    genre: string;
    duration: string;
}

interface MediaGridProps {
    items: MediaItem[];
    onSelect: (item: MediaItem) => void;
    selectedId: string | null;
}

export function MediaGrid({ items, onSelect, selectedId }: MediaGridProps) {
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-16 w-16 mb-4 rounded-full bg-white/5 flex items-center justify-center">
                    <Play className="h-6 w-6 text-zinc-600" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">No movies found</h3>
                <p className="text-sm text-zinc-500">Try adjusting your search or filters.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {items.map((item) => {
                const isSelected = selectedId === item.id;

                return (
                    <motion.div
                        key={item.id}
                        layoutId={`card-${item.id}`}
                        onClick={() => onSelect(item)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${isSelected ? "ring-2 ring-blue-500 shadow-xl shadow-blue-500/20" : "hover:ring-2 hover:ring-white/20"
                            }`}
                    >
                        {/* Aspect Ratio Container */}
                        <div className="aspect-[2/3] relative bg-zinc-800">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className={`object-cover transition-opacity duration-300 ${isSelected ? "opacity-100" : "group-hover:opacity-80 opacity-60"
                                    }`}
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                            {/* Selection Check/Overlay */}
                            {isSelected && (
                                <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center backdrop-blur-[1px]">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center shadow-lg"
                                    >
                                        <Play className="h-6 w-6 text-white ml-1 fill-white" />
                                    </motion.div>
                                </div>
                            )}

                            {/* Content info */}
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                <h3 className="text-sm font-medium text-white line-clamp-1 mb-1">{item.title}</h3>
                                <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                                    <span>{item.year}</span>
                                    <span>•</span>
                                    <span>{item.genre}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
