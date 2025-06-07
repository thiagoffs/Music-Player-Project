import { View, StyleSheet, Platform } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColor";
import NavMenuItem from "./NavMenuItem";

export default function NavMenu() {
  const colors = useThemeColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <NavMenuItem
        icon={"home"}
        text={"Início"}
        route="/(tabs)/home"
      />
      <NavMenuItem
        icon={"search"}
        text={"Explorar"}
        route="/(tabs)/explore"
      />
      <NavMenuItem
        icon={"musical-notes"}
        text={"Músicas"}
        route="/"
      />
      <NavMenuItem
        icon={"disc-sharp"}
        text={"Álbuns"}
        route="/(tabs)/albums"
      />
      <NavMenuItem
        icon={"people"}
        text={"Artistas"}
        route="/(tabs)/artists"
      />
      <NavMenuItem
        icon={"play-circle-sharp"}
        text={"Playlists"}
        route="/(tabs)/playlists"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
    paddingBottom: Platform.OS === "ios"? 25:15
  },
});
