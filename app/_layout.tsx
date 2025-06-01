import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import MiniPlayer from "@/components/MiniPlayer";
import { MusicProvider } from "@/Context/musicContext";

export default function RootLayout() {
  return (
      <MusicProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="radio" />
          <Stack.Screen name="player" />
          <Stack.Screen name="lyric" />
        </Stack>
        <MiniPlayer />
      </MusicProvider>
  );
}
