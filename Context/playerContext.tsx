import React, { createContext, useContext, useState, useRef } from "react";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { useDatabase } from "@/database/useDatabase";

type Track = {
  uri: string;
  name?: string;
  artist?: string;
  image?: string;
  id?: string;
};

type PlayerContextType = {
  currentTrack: Track | null;
  isPlaying: boolean;
  playTrack: (track: Track, playlist?: Track[]) => Promise<void>;
  togglePlayPause: () => Promise<void>;
  togglePreviousSong: () => Promise<void>;
  toggleNextSong: () => Promise<void>;
  duration: number;
  position: number;
  seekTo: (milliseconds: number) => Promise<void>;
  setVolume: (value: number) => Promise<void>;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);

  const soundRef = useRef<Sound | null>(null);

  const playTrack = async (track: Track, newPlaylist?: Track[]) => {
    const database = await useDatabase();

    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: track.uri },
        { shouldPlay: true }
      );
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setDuration(status.durationMillis || 0);
          setPosition(status.positionMillis || 0);
        }
      });
      soundRef.current = sound;
      setCurrentTrack(track);
      setIsPlaying(true);

      if(track.id) {        
          const existsDataOnRecentPlays = await database.existsDataOnRecentPlays(track.id);
          if(existsDataOnRecentPlays === true) {
            await database.incrementQuantityPlays(track.id);
            console.log("A quantidade de plays foi incrementada");
          } else {
            await database.insertInRecentPlaysTable(track.id);
            console.log("A música foi adicionada como registro na tabela recent_plays");
          }
      } else {
        console.log("Erro no registro, pois o id é indefinido | null.");
      }
      
      if (newPlaylist) {
        const index = newPlaylist.findIndex((t) => t.uri === track.uri);
        if (index !== -1) {
          setPlaylist(newPlaylist);
          setCurrentIndex(index);
        }
      }
    } catch (e) {
      console.error("Erro ao carregar música:", e);
    }
  };

  const togglePlayPause = async () => {
    if (!soundRef.current) return;
    const status = await soundRef.current.getStatusAsync();
    if (status.isLoaded && status.isPlaying) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await soundRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  const togglePreviousSong = async () => {
    if (playlist.length === 0 || currentIndex <= 0) return;
    const prevTrack = playlist[currentIndex - 1];
    await playTrack(prevTrack, playlist);
  };

  const toggleNextSong = async () => {
    if (playlist.length === 0 || currentIndex >= playlist.length - 1) return;
    const nextTrack = playlist[currentIndex + 1];
    await playTrack(nextTrack, playlist);
  };

  const seekTo = async (milliseconds: number) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(milliseconds);
    }
  };

  const setVolume = async (value: number) => {
    if (soundRef.current) {
      try {
        await soundRef.current.setVolumeAsync(value);
      } catch (error) {
        console.error("Erro ao ajustar volume:", error);
      }
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        togglePlayPause,
        togglePreviousSong,
        toggleNextSong,
        duration,
        position,
        seekTo,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context)
    throw new Error("usePlayer deve ser usado dentro de PlayerProvider");
  return context;
};
