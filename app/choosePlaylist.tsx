import Header from "@/components/Header";
import PlaylistCard from "@/components/PlaylistCard";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useCurrentTrack } from "@/store/playerSelectors";
import { useDatabase } from "@/database/useDatabase";

type PlaylistWithCount = {
    id: number;
    name: string;
    songCount: number;
};
export default function ChoosePlaylist() {
    const [modalVisible, setModalVisible] = useState(false);
    const track = useCurrentTrack();
    const database = useDatabase();
    const [playlistName, setPlaylistName] = useState("");
    const [playlists, setPlaylists] = useState<
        (PlaylistWithCount & { songCount: number })[]
    >([]);

    const loadPlaylists = async () => {
        const db = await database; 
        const rawPlaylists = await db.queryAllPlaylists();

        const playlistsWithCount = await Promise.all(
            rawPlaylists.map(async (playlist) => {
                const songCount = await db.getSongCountInPlaylist(playlist.id);
                return { ...playlist, songCount };
            })
        );
        setPlaylists(playlistsWithCount);
    };
    useEffect(() => {
        loadPlaylists();
    }, []);

    const handleCreatePlaylist = async () => {
        if (!playlistName.trim()) return;
        try {
            const db = await database;
            await db.createPlaylist(playlistName.trim());
            setPlaylistName("");
            setModalVisible(false);
            await loadPlaylists();
        } catch (error) {
            console.error("Erro ao criar playlist:", error);
        }
    };
    const handleDeletePlaylist = async (playlistId: number) => {
  try {
    const db = await database;
    await db.deletePlaylist(playlistId);

    await loadPlaylists();
  } catch (error) {
    console.error("Erro ao deletar playlist:", error);
  }
};


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="close" size={25} color="#fff" />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>Adicionar à playlist </Text>
            <View style={{ flex: 1, width: "100%", padding: 10, gap: 1, alignItems: "center" }}>
                <View>
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        style={{
                            backgroundColor: "#1A1A1A",
                            padding: 12,
                            width: 170,
                            borderRadius: 15,
                            alignItems: "center",
                            marginBottom: 50,
                        }}
                    >
                        <Text style={{ color: "#FFF", fontSize: 16 }}>Nova Playlist</Text>
                    </TouchableOpacity>
                </View>
                <PlaylistCard
                    id_music={track?.id}
                    onPress={() => router.push("../list/favorites")}
                    isFavoriteCard={true}
                    dynamicSubTitle={true}
                />
                {track &&
                    playlists.map((playlist) => (
                        <PlaylistCard
                            key={playlist.id}
                            title={playlist.name}
                            icon="musical-notes"
                            id_music={track.id}
                            id_playlist={playlist.id}
                            isFavoriteCard={false}
                            showCheckbox={true}
                            dynamicSubTitle={true}
                            onDelete={()=>handleDeletePlaylist(playlist.id)}
                        />
                    ))}
                {modalVisible && (
                    <View style={styles.modal}>
                        <View style={styles.modalContent}>
                            <View style={{ width: "100%", alignItems: "flex-end" }}>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <Ionicons name="close" size={25} color="#fff" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "100%", gap: 30, alignItems: "center" }}>
                                <Text
                                    style={{
                                        color: "#FFF",
                                        fontSize: 18,
                                        marginBottom: 15,
                                        textAlign: "center",
                                    }}
                                >
                                    Criar nova Playlist
                                </Text>
                                <TextInput
                                    placeholder="Nome da Playlist"
                                    placeholderTextColor={"#5C5C5C"}
                                    style={{
                                        borderBottomWidth: 1,
                                        borderColor: "white",
                                        width: "100%",
                                        color: "white",
                                        padding: 0,
                                    }}
                                    value={playlistName}
                                    onChangeText={setPlaylistName}
                                />

                                <TouchableOpacity
                                    onPress={handleCreatePlaylist}
                                    style={{
                                        backgroundColor: "#2F2A2A",
                                        padding: 12,
                                        width: 170,
                                        borderRadius: 15,
                                        alignItems: "center",
                                    }}
                                >
                                    <Text style={{ color: "#FFF", fontSize: 16 }}>
                                        Criar Playlist
                                    </Text>
                                </TouchableOpacity>
                                <View></View>
                            </View>
                        </View>
                    </View>
                )}
            </View>
            <View></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2F2A2A",
        alignItems: "center",
        alignContent: "center",
        paddingTop: "5%",
    },

    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        paddingHorizontal: 20,
        marginTop: 15,
    },

    title: {
        color: "#fff",
        fontSize: 20,
        textAlign: "center",
        paddingVertical: 12,
    },
    modal: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#1A1A1A",
        padding: 20,
        borderRadius: 15,
        width: "80%",
        alignItems: "center",
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#333",
        borderRadius: 15,
        width: 100,
        alignItems: "center",
    },
});
