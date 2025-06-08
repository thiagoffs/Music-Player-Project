import { useRouter, usePathname } from "expo-router";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import Logo from "../components/Logo";
const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <View style={styles.header}>
            {pathname !== "/explore" && <TouchableOpacity onPress={() => router.push("/searchMusicLocal")}>
                <Image source={require("../assets/icons/search_header.png")} />
            </TouchableOpacity>
            }
            <Logo/>
            {pathname !== "/explore" && <TouchableOpacity onPress={() => router.push("/config")}>
                <Image source={require("../assets/icons/settings.png")} />
            </TouchableOpacity>
            }
        </View>
    );
};
export default Header;

const styles = StyleSheet.create({
    header: {
        width: "90%",
        marginTop: 15,
        padding: 2,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
    },
    recentsTitleText: {
        color: "#fff",
        fontSize: 24,
    },
});