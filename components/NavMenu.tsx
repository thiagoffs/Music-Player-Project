import { View, StyleSheet } from "react-native";
import NavenuItem from "./NavMenuItem";

export default function NavMenu() {
  return (
    <View style={styles.container}>
      <NavenuItem
        icon={require("@/assets/icons/home.png")}
        text={"Início"}
      />
      <NavenuItem
        icon={require("@/assets/icons/music.png")}
        text={"Músicas"}
      />
      <NavenuItem
        icon={require("@/assets/icons/album.png")}
        text={"Albums"}
      />
      <NavenuItem
        icon={require("@/assets/icons/artist.png")}
        text={"Artistas"}
      />
      <NavenuItem
        icon={require("@/assets/icons/playlist.png")}
        text={"Playlists"}
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
    padding: 20,
    justifyContent: "space-around",
  },
});
