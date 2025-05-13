import { useRouter } from "expo-router";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import Logo from "../components/Logo";
const Header = () => {
    const router = useRouter();
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.push('/explore')}>
                <Image source={require("../assets/icons/search_header.png")} />
            </TouchableOpacity>
            <Logo/>
            <TouchableOpacity onPress={() => router.push("/config")}>
                <Image source={require("../assets/icons/settings.png")} />
            </TouchableOpacity>
        </View>
    );
};
export default Header;

const styles = StyleSheet.create({
    header: {
        width: "90%",
        marginTop: 15,
        padding: 2,
        marginBottom: "10%",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    recentsTitleText: {
        color: "#fff",
        fontSize: 24,

    },
});