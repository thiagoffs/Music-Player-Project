import { MaterialIcons } from "@expo/vector-icons";
import { View,StyleSheet,Text } from "react-native";

const Logo = () => {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <View style={{ padding: 2, marginHorizontal: 5, backgroundColor: "white", borderRadius: 4 }}>
                <MaterialIcons name="music-note" size={24} color="#2F2A2A" />
            </View>
            <Text style={styles.recentsTitleText}>Beatfy</Text>
        </View>
    );
};
export default Logo;

const styles = StyleSheet.create({
    recentsTitleText: {
        color: "#fff",
        fontSize: 24,

    },
});