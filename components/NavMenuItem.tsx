import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import type { LinkProps } from "expo-router";
import { usePathname } from "expo-router";

const NavMenuItem = ({ icon, text,route }: { icon: any; text: string; route: LinkProps["href"]}) => {

  const pathname = usePathname();
  const cleanPath = (path: string) => path.replace("/(tabs)", "");
  const isActive = cleanPath(pathname) === cleanPath(typeof route === "string" ? route : "");
    return (
    <Link href={route} asChild style={{ flex: 1 }}>
    <TouchableOpacity style={styles.button}>
      <Image source={typeof icon === "string" ? { uri: icon } : icon} style={[styles.image, isActive && styles.activeImage] } />
      <Text style={isActive ? styles.text : {display: "none"}}>{text}</Text>
    </TouchableOpacity>
    </Link>
  );
};
export default NavMenuItem;

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#FFF",
    fontSize: 12,
    textAlign: "center",
    display: "flex",
  },
  image: {
    width: 15,
    height: 15,
    marginBottom: 5,
    opacity: 0.6,
  },
  activeImage: {
    transform: [{ scale: 1.3 }],
    opacity: 1,
  }
});