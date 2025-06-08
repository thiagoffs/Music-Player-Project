import { usePlayerStore } from "./playerStore";

export const useCurrentTrack = () => usePlayerStore((state) => state.currentTrack);

export const useIsPlaying = () => usePlayerStore((state) => state.isPlaying);

export const usePlayTrack = () => usePlayerStore((state) => state.playTrack);

export const useTogglePlayPause = () => usePlayerStore((state) => state.togglePlayPause);

export const useToggleNextSong = () => usePlayerStore((state) => state.toggleNextSong);

export const useTogglePreviousSong = () => usePlayerStore((state) => state.togglePreviousSong);

export const useDuration = () => usePlayerStore((state) => state.duration);

export const usePosition = () => usePlayerStore((state) => state.position);

export const useSeekTo = () => usePlayerStore((state) => state.seekTo);

export const useSetVolume = () => usePlayerStore((state) => state.setVolume);

export const usePlaySelectedTrack = () => usePlayerStore((state) => state.playSelectedTrack);
