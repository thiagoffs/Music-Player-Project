import { View, StyleSheet, Platform } from "react-native";
import NavMenuItem from "./NavMenuItem";

export default function NavMenu() {
  return (
    <View style={styles.container}>
      <NavMenuItem
        icon={require("@/assets/icons/home.png")}
        text={"Início"}
        route="/(tabs)/home"
      />
      <NavMenuItem
        icon={require("@/assets/icons/search.png")}
        text={"Explorar"}
        route="/(tabs)/explore"
      />
      <NavMenuItem
        icon={require("@/assets/icons/music.png")}
        text={"Músicas"}
        route="/"
      />
      <NavMenuItem
        icon={require("@/assets/icons/album.png")}
        text={"Álbuns"}
        route="/(tabs)/albums"
      />
      <NavMenuItem
        icon={require("@/assets/icons/artist.png")}
        text={"Artistas"}
        route="/(tabs)/artists"
      />
      <NavMenuItem
        icon={require("@/assets/icons/playlist.png")}
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
    backgroundColor: "#3A3535",
    padding: 15,
    justifyContent: "space-around",
    paddingBottom: Platform.OS === "ios"? 25:15
  },
});
