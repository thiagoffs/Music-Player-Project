import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import MiniPlayer from "@/components/MiniPlayer";
import { MusicProvider } from "@/Context/musicContext";
import { useThemeStore } from "@/store/themeStore";

export default function RootLayout() {
  const theme = useThemeStore((state) => state.theme);
  return (
      <MusicProvider>
        <StatusBar style={theme === "dark" ? "light" : "dark"} />
        <Stack screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}>
          <Stack.Screen name="radio" />
          <Stack.Screen name="player" />
          <Stack.Screen name="lyric" />
          <Stack.Screen name="choosePlaylist" />
        </Stack>
      
      <MiniPlayer />
    </MusicProvider>
  );
}
