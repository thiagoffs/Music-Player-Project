import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ViewBase, ScrollView } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Music from '../components/Music'
//import {IconConfig} from '../assets/images/IconConfig.svg';

export default function Index() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => console.log("Buscar")}>
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
                        <Image source={require("../assets/images/ion_radio.png")} />
                        <TouchableOpacity>
                            <Text style={styles.text}>OUVIR RÁDIO</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.recents}>
                        <View style={styles.recentesTitle}>
                            <Text style={styles.recentsTitleText}>Tocadas Recentemente</Text>
                            <AntDesign name="arrowright" size={29} color="white" />
                        </View>
                        <View style={styles.listMusicCarrosel}>
                            <Music name='My Way' url={require("../assets/images/image1Albuns.png")}></Music>
                            <Music name='Breathe' url={require("../assets/images/image2Albuns.png")}></Music>
                            <Music name='Sad But true' url={require("../assets/images/image3Albuns.png")}></Music>

                        </View>
                    </View>
                    <View style={styles.favorite}>
                        <View style={styles.recentesTitle}>
                            <Text style={styles.recentsTitleText}>Favoritas</Text>
                            <AntDesign name="arrowright" size={29} color="white" />
                        </View>

                        <View style={styles.favoritesList}>
                            <Music mode='vertical' name='Mr. Fear' url={require("../assets/images/image4Albuns.png")} artist='SIAMÉS' />
                            <Music mode='vertical' name='Borderline' url={require("../assets/images/image5Albuns.png")} artist='Tame Impala' />
                            <Music mode='vertical' name='Decida' url={require("../assets/images/image6Albuns.png")} artist='Zezo Potiguar' />

                        </View>
                    </View>

                    <View>
                        <View style={styles.recentesTitle}>
                            <Text style={styles.recentsTitleText}>Álbuns</Text>
                            <AntDesign name="arrowright" size={29} color="white" />
                        </View>

                        <View style={styles.albuns}>
                            <Music mode='grid' name='Plastic Beach' artist='Gorillaz' url={require("../assets/images/Album1.png")} />
                            <Music mode='grid' name='True Defiance' artist='Demon Hunter' url={require("../assets/images/Album2.png")} />
                            <Music mode='grid' name='Bis Jovem Guarda' artist='Paulo Sergio' url={require("../assets/images/Album3.png")} />
                            <Music mode='grid' name='20 Super Sucessos' artist='José Ribeiro' url={require("../assets/images/Album4.png")} />
                        </View>
                    </View>
                    <View>
                        <View style={styles.recentesTitle}>
                            <Text style={styles.recentsTitleText}>PlayLists</Text>
                            <AntDesign name="arrowright" size={29} color="white" />
                        </View>

                        <View style={styles.albuns}>
                           <Music mode='grid' name='Ficar Monstrão' url={require("../assets/images/ImagePlaylist.png")}/>
                           <Music mode='grid' name='As Melhores Clássicas' url={require("../assets/images/ImagePlaylist2.png")}/>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ width: "100%", minHeight: 83, justifyContent: "center", alignItems: "center", backgroundColor: "#3A3535" }}>
                <Text style={styles.recentsTitleText}>Menu</Text>
            </View>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2F2A2A",
        flex: 1,
        alignItems: "center"
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
        marginBottom:28,
        width: "100%",
        flex: 1,
        justifyContent: "space-between",
    },
    favoritesList: {
        flexDirection: "column",
    },
    albuns: {
        marginTop: 15,
        marginBottom:28,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginLeft: -15,
        gap: 25
    }
});