import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import MiniPlayer from "@/components/MiniPlayer";
import { MusicProvider } from "@/Context/musicContext";
import { FavoriteProvider } from "@/Context/favoriteContext";

export default function RootLayout() {
  return (
    <MusicProvider>
      <FavoriteProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="radio" />
          <Stack.Screen name="player" />
          <Stack.Screen name="lyric" />
          <Stack.Screen name="choosePlaylist" />
        </Stack>
      </FavoriteProvider>
      <MiniPlayer />
    </MusicProvider>
  );
}
