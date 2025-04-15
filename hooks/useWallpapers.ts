import { useState } from "react";
import { wallpapers as wallpaperData } from "@/assets/wallpapers";

export const useWallpapers = () => {
    // const [wallpapers, setWallpapers] = useState<Record<string, any>>();
    
    // Function to get all wallpapers randomized
    const getAllWallpapers = () => {
        // Flatten the wallpaper data into a single array
        const allWallpapers = Object.entries(wallpaperData).flatMap(([category, wallpapers]) => 
            wallpapers.map(wallpaper => ({ ...wallpaper, category }))
        );
        
        // Randomize the array using Fisher-Yates shuffle algorithm
        const shuffledWallpapers = [...allWallpapers];
        for (let i = shuffledWallpapers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledWallpapers[i], shuffledWallpapers[j]] = [shuffledWallpapers[j], shuffledWallpapers[i]];
        }
        
        return shuffledWallpapers;
    };

    // Initialize wallpapers state
    const [wallpapers, setWallpapers] = useState(() => getAllWallpapers());

    // Return the wallpapers and a function to refresh them
    return { wallpapers, refreshWallpapers: () => setWallpapers(getAllWallpapers()) };
}