import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MusicInfo } from '@/database/useDatabase';
import Music from './Music';
import { Ionicons } from '@expo/vector-icons';
import { usePlayTrack } from "@/store/playerSelectors";


interface ModalPlaylistProps {
    visible: boolean;
    onClose: () => void;
    playlistMusics: MusicInfo[];
}

export default function ModalPlaylistDetails({ visible, onClose, playlistMusics }: ModalPlaylistProps) {
    const playTrack = usePlayTrack();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Músicas da Playlist</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={25} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        {playlistMusics.map((music, index) => (
                            <Music
                                key={music.path ?? `${music.name} - ${index}`}
                                mode="local"
                                name={music.name}
                                artist={music.artist ?? "Desconhecido(a)"}
                                url={music.url ?? require("../assets/icons/default-song.png")}
                                path={music.path}
                                id={music.id}
                                onPress={() =>
                                    playTrack(
                                        {
                                            id: music.id,
                                            name: music.name,
                                            uri: music.path ?? "",
                                            artist: music.artist,
                                        },)}
                            />
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#1E1E1E',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        maxHeight: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    close: {
        color: '#F66',
        fontWeight: 'bold',
    },
});
