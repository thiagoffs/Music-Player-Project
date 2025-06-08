import React, { createContext, useState, useContext } from 'react';
import type { Asset, PagedInfo } from 'expo-media-library';

interface MusicContextProps {
  musics?: PagedInfo<Asset>;
  setMusics: (musics: PagedInfo<Asset>) => void;
}

const MusicContext = createContext<MusicContextProps>({
  musics: undefined,
  setMusics: () => {},
});

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [musics, setMusics] = useState<PagedInfo<Asset>>();

  return (
    <MusicContext.Provider value={{ musics, setMusics }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusics = () => useContext(MusicContext);
