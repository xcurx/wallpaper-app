import { useState } from "react";
import { wallpapers as wallpaperData } from "@/assets/wallpapers";

export const useWallpapers = (category?:string) => {
    const getAllWallpapers = () => {
        const allWallpapers = Object.entries(wallpaperData).flatMap(([category, wallpapers]) => 
            wallpapers.map(wallpaper => ({ ...wallpaper, category }))
        );
        
        const shuffledWallpapers = [...allWallpapers];
        for (let i = shuffledWallpapers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledWallpapers[i], shuffledWallpapers[j]] = [shuffledWallpapers[j], shuffledWallpapers[i]];
        }
        
        return shuffledWallpapers;
    };

    const getCategories = () => {
        const categories = Object.keys(wallpaperData);
        return categories;
    }

    const getWallpersByCategory = (category: keyof typeof wallpaperData) => {
        const wallpapers = wallpaperData[category];
        return wallpapers;
    }

    const [wallpapers, setWallpapers] = useState(() => getAllWallpapers());
    const [categories, setCategories] = useState(() => getCategories());
    const [wallpersByCategory, setWallpersByCategory] = useState(() => getWallpersByCategory(category as keyof typeof wallpaperData));

    return { 
        wallpapers, 
        refreshWallpapers: () => setWallpapers(getAllWallpapers()),
        categories,
        wallpersByCategory,
        setWallpersByCategory
    };
}