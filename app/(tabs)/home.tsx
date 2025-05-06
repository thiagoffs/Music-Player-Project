import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ViewBase, ScrollView } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Music from '../../components/Music'
import { useRouter } from 'expo-router';

//Tela home
export default function Home() {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <FontAwesome5 name="search" size={29} color="white" />
                </TouchableOpacity>
                <Text style={styles.recentsTitleText}>Nome do App</Text>
                <TouchableOpacity>
                    <Ionicons name="settings-sharp" size={29} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView
                contentContainerStyle={{ paddingBottom: "10%" }}
                style={styles.scroll}>
                <View style={{ gap: 17 }}>
                    <View style={styles.buttonRadio}>
                        <Image source={require("../../assets/images/ion_radio.png")} />
                        <TouchableOpacity onPress={() => router.push("/radio")}>
                            <Text style={styles.text}>OUVIR RÁDIO</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.recents}>
                        <View style={styles.recentesTitle}>
                            <Text style={styles.recentsTitleText}>Tocadas Recentemente</Text>
                            <TouchableOpacity onPress={() => router.push("/list/recent")}>
                                <AntDesign name="arrowright" size={29} color="white" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.listMusicCarrosel}>
                            <Music name='My Way' url={{ uri: "https://placecats.com/300/300" }} key = "example1" path = "/file/music/example.mp3"></Music>
                            <Music name='Breathe' url={{ uri: "https://placecats.com/300/300" }} key = "example2" path = "/file/music/example.mp3"></Music>
                            <Music name='Sad But true' url={{ uri: "https://placecats.com/300/300" }} key = "example3" path = "/file/music/example.mp3"></Music>
                        </View>
                    </View>
                    <View style={styles.favorite}>
                        <View style={styles.recentesTitle}>
                            <Text style={styles.recentsTitleText}>Favoritas</Text>
                            <TouchableOpacity onPress={() => router.push("/list/favorites")}>
                                <AntDesign name="arrowright" size={29} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.favoritesList}>
                            <Music mode='vertical' name='Mr. Fear' url={{ uri: "https://placecats.com/300/300" }} artist='SIAMÉS' key = "example4" path = "/file/music/example.mp3" />
                            <Music mode='vertical' name='Borderline' url={{ uri: "https://placecats.com/300/300" }} artist='Tame Impala' key = "example5" path = "/file/music/example.mp3" />
                            <Music mode='vertical' name='Decida' url={{ uri: "https://placecats.com/300/300" }} artist='Zezo Potiguar' key = "example6" path = "/file/music/example.mp3" />

                        </View>
                    </View>

                    <View>
                        <View style={styles.recentesTitle}>
                            <Text style={styles.recentsTitleText}>Álbuns</Text>
                            <TouchableOpacity onPress={() => router.push("/list/albums")}>
                                <AntDesign name="arrowright" size={29} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.albuns}>
                            <Music mode='grid' name='Plastic Beach' artist='Gorillaz' url={{ uri: "https://placecats.com/300/300" }} key = "example7" path = "/file/music/example.mp3" />
                            <Music mode='grid' name='True Defiance' artist='Demon Hunter' url={{ uri: "https://placecats.com/300/300" }} key = "example8" path = "/file/music/example.mp3" />
                            <Music mode='grid' name='Bis Jovem Guarda' artist='Paulo Sergio' url={{ uri: "https://placecats.com/300/300" }} key = "example9" path = "/file/music/example.mp3" />
                            <Music mode='grid' name='20 Super Sucessos' artist='José Ribeiro' url={{ uri: "https://placecats.com/300/300" }} key = "example10" path = "/file/music/example.mp3" />
                        </View>
                    </View>
                    <View>
                        <View style={styles.recentesTitle}>
                            <Text style={styles.recentsTitleText}>PlayLists</Text>
                            <TouchableOpacity onPress={() => router.push("/list/playlists")}>
                                <AntDesign name="arrowright" size={29} color="white" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.albuns}>
                            <Music mode='grid' name='Ficar Monstrão' url={{ uri: "https://placecats.com/300/300" }} key = "example11" path = "/file/music/example.mp3" />
                            <Music mode='grid' name='As Melhores Clássicas' url={{ uri: "https://placecats.com/300/300" }} key = "example12" path = "/file/music/example.mp3" />
                            <Music mode='grid' name='As Melhores Clássicas' url={{ uri: "https://placecats.com/300/300" }} key = "example13" path = "/file/music/example.mp3" />

                        </View>
                    </View>
                </View>
            </ScrollView>


        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2F2A2A",
        flex: 1,
        alignItems: "center",
        paddingTop: 20
    },
    scroll: {
        width: "100%",
        padding: "5%",
        flexDirection: 'column',
    },
    text: {
        fontSize: 24,
        color: "white",
        backgroundColor: "#1A1A1A",
        borderRadius: 30,
        padding: 2,
        width: 183,
        textAlign: "center"
    },
    header: {
        width: "90%",
        marginTop: 15,
        padding: 2,
        marginBottom: "10%",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    recents: {
        width: "100%",
    },
    recentesTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 30
    },
    recentsTitleText: {
        color: "#fff",
        fontSize: 24,
    },
    buttonRadio: {
        marginBottom: "20%",
        alignItems: "center",
        gap: 10,
    },
    listMusicCarrosel: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    favorite: {
        marginTop: 15,
        marginBottom: 28,
        width: "100%",
        flex: 1,
        justifyContent: "space-between",
    },
    favoritesList: {
        flexDirection: "column",
    },
    albuns: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 10, // ou 0 pra testar
        marginLeft: 0,
    }
});