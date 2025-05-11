import NavMenu from "@/components/NavMenu";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={() => <NavMenu />} 
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Início" }} />
      <Tabs.Screen name="index" options={{ title: "Músicas" }} />
      <Tabs.Screen name="albums" options={{ title: "Álbuns" }} />
      <Tabs.Screen name="artists" options={{ title: "Artistas" }} />
      <Tabs.Screen name="playlists" options={{ title: "Playlists" }} />
      <Tabs.Screen name="list/[type]" options={{ href: null }} />
    </Tabs>
  );
}
