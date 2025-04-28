import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import type { LinkProps } from "expo-router";


const NavenuItem = ({ icon, text,route }: { icon: any; text: string; route: LinkProps["href"]}) => {

  return (
    <Link href={route} asChild>
    <TouchableOpacity style={styles.button}>
      <Image source={typeof icon === "string" ? { uri: icon } : icon} style={styles.image} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
    </Link>
  );
};
export default NavenuItem;

const styles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },  
  text: {
    color: "#FFF",
    textAlign: "center",
  },
  image: {
    width: 24,
    height: 24,
    marginBottom: 5,
  }
});