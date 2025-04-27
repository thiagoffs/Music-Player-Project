import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";

const NavenuItem = ({ icon, text }: { icon: any; text: string }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Image source={typeof icon === "string" ? { uri: icon } : icon} style={styles.image} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
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