import React, { createContext, useContext, useEffect, useState } from "react";
import { useDatabase } from "@/database/useDatabase";

type FavoriteContextType = {
  favoriteIds: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => Promise<void>;
  reloadFavorites: () => Promise<void>;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const database = useDatabase();

  const loadFavorites = async () => {
    const db = await database;
    const favorites = await db.queryFavoriteMusics();
    const ids = favorites.map((music: any) => music.id);
    setFavoriteIds(ids);
  };

  const isFavorite = (id: string) => favoriteIds.includes(id);

  const toggleFavorite = async (id: string) => {
    const db = await database;
    const alreadyFav = isFavorite(id);

    if (alreadyFav) {
      await db.removeFavoriteMusic(id);
    } else {
      await db.addFavoriteMusic(id);
    }
    await loadFavorites();
  };

  const reloadFavorites = async () => {
    await loadFavorites();
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <FavoriteContext.Provider
      value={{ favoriteIds, isFavorite, toggleFavorite, reloadFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  const context = useContext(FavoriteContext);
  if (!context) throw new Error("useFavorite precisa estar dentro de FavoriteProvider");
  return context;
};
