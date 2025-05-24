import Logo from "@/components/Logo";
import Music from "@/components/Music";
import { useMusics } from "@/Context/musicContext";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet, SafeAreaView, TextInput, FlatList } from "react-native";

export default function SearchMusicLocal() {
    const router = useRouter();
    const { musics } = useMusics();
    const [search, setSearch] = useState("");

    const filteredMusics = musics?.assets.filter((music) =>
        music.filename.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                width: "90%",
                marginTop: 15,
                padding: 2,
                justifyContent: "center",
                flexDirection: "row",
            }}>
                <Logo />
            </View>
            <View style={styles.content}>
                <AntDesign name="arrowleft" size={29} color="white" style={{ paddingRight: 10 }} onPress={() => router.push("../")} />
                <TextInput
                    style={styles.textInput}
                    placeholder="Músicas, albums, artistas, playlists"
                    placeholderTextColor={"#5C5C5C"}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
            <View style={{width:"100%"}}>

                <FlatList
                    data={filteredMusics}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Music
                            mode="local"
                            url={require("../../assets/icons/default-song.png")}
                            name={item.filename}
                            path={item.uri}
                            artist="Desconhecido(a)"
                        />
                    )}
                />
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
        flexDirection: "row",
        justifyContent: 'space-between',
        marginVertical:20
    },
    textInput: {
        color: "#ffffff",
        width: 361,
        padding: 5,
        borderRadius: 12,
        backgroundColor: "#3A3535",
    }

});
