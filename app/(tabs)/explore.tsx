import Logo from "@/components/Logo";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, StyleSheet, Text, SafeAreaView, TextInput } from "react-native";

//Tela Album
export default function Explore() {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <View style={{width:"100%",height:60, justifyContent:"center"}}>
                <Logo />
            </View>
            <View style={styles.content}>
                <AntDesign name="arrowleft" size={29} color="white" style={{ paddingRight: 10 }} onPress={() => router.push("../")} />
                <TextInput style={styles.textInput} placeholder="Músicas, albums, artistas, playlists" placeholderTextColor={"#5C5C5C"}></TextInput>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2F2A2A",
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
        
    },
    content: {
        marginTop: 100,
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    textInput: {

        width: 361,
        padding: 5,
        borderRadius: 12,
        backgroundColor: "white",
    }

});
