import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PlayerProvider } from "@/Context/playerContext";
import MiniPlayer from "@/components/MiniPlayer";

export default function RootLayout() {
  return (
    <PlayerProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="radio" />
        <Stack.Screen name="player" />
      </Stack>
      <MiniPlayer />
    </PlayerProvider>
  );
}
