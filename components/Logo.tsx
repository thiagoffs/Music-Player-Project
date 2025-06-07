import { View,StyleSheet,Text } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColor";
import { MaterialIcons } from "@expo/vector-icons";
const Logo = () => {
    const colors = useThemeColors();
    return (
        <View style={styles.container}>
            <View style={{ padding: 2, marginHorizontal: 5, backgroundColor: colors.text, borderRadius: 4 }}>
                <MaterialIcons name="music-note" size={24} color={colors.background} />
            </View>
            <Text style={[styles.recentsTitleText, { color: colors.text }]}>Beatfy</Text>
        </View>
    );
};
export default Logo;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    justifyContent: "center" 
},
    recentsTitleText: {
        fontSize: 24,
    },
});