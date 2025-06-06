import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useDatabase } from "@/database/useDatabase";

interface PlaylistCardProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title?: string;
  subtitle?: string;
  onPress?: () => void;
  showCheckbox?: boolean;
  initiallyChecked?: boolean;
  dynamicSubTitle?: boolean;
  id_music?: string;
  isFavoriteCard?: boolean;
  onDelete?: () => void;
  showDeleteButton?: boolean;

}

export default function PlaylistCard({
  icon = "heart",
  title = "Favoritas",
  subtitle,
  onPress,
  showCheckbox = true,
  initiallyChecked = false,
  dynamicSubTitle = false,
  id_music,
  isFavoriteCard,
  id_playlist,
  onDelete,
  showDeleteButton

}: PlaylistCardProps & { id_playlist?: number }) {
  const [isChecked, setIsChecked] = useState(initiallyChecked);
  const [favCount, setFavCount] = useState(0);
  const [playlistCount, setPlaylistCount] = useState(0);
  const database = useDatabase();

  const queryFav = async () => {
    const favs = await (await database).queryFavoriteMusics();
    setFavCount(favs.length);
  };
  const queryIfFavorite = async () => {
    if (!id_music) return;
    const isFav = await (await database).isFavoriteMusic(id_music);
    setIsChecked(isFav);
  };
  const queryPlaylistCount = async () => {
    if (id_playlist !== undefined) {
      const db = await database;
      const count = await db.getSongCountInPlaylist(id_playlist)
      setPlaylistCount(count);
    }
  };
  const addFavoriteMusic = async (musicId: string) => {
    const db = await database;
    await db.addFavoriteMusic(musicId);
  };
  const removeFavoriteMusic = async (musicId: string) => {
    const db = await database;
    await db.removeFavoriteMusic(musicId);
  };
  const queryIfInPlaylist = async () => {
    if (id_music && id_playlist !== undefined) {
      const db = await database;
      const inPlaylist = await db.isMusicInPlaylist(id_playlist, id_music);
      setIsChecked(inPlaylist);
    }
  };
  const addMusicToPlaylist = async () => {
    if (id_music && id_playlist !== undefined) {
      const db = await database;
      await db.addMusicToPlaylist(id_playlist, id_music);
    }
  };
  const removeMusicFromPlaylist = async () => {
    if (id_music && id_playlist !== undefined) {
      const db = await database;
      await db.removeMusicFromPlaylist(id_playlist, id_music);
    }
  };
  useEffect(() => {
    if (isFavoriteCard) {
      queryFav();
      queryIfFavorite();
    } else {
      queryIfInPlaylist();
      queryPlaylistCount();
    }
  }, []);

  const handleToggle = async () => {
    if (!id_music) return;

    try {
      if (isFavoriteCard) {
        if (isChecked) {
          await removeFavoriteMusic(id_music);
        } else {
          await addFavoriteMusic(id_music);
        }
        await queryFav();
      } else if (id_playlist !== undefined) {
        if (isChecked) {
          await removeMusicFromPlaylist();
        } else {
          await addMusicToPlaylist();
        }
        await queryPlaylistCount();
      }
      setIsChecked(!isChecked);
    } catch (err) {
      console.error("Erro ao alternar:", err);
    }
  };
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={32} color="#1A1A1A" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>
          {dynamicSubTitle
            ? isFavoriteCard
              ? `${favCount} música${favCount !== 1 ? "s" : ""}`
              : `${playlistCount} música${playlistCount !== 1 ? "s" : ""}`
            : subtitle}
        </Text>
      </View>
      {showCheckbox && (
        <TouchableOpacity style={styles.actionIcon} onPress={handleToggle}>
          <Ionicons
            name={isChecked ? "checkbox" : "square-outline"}
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
      )}
      {!isFavoriteCard && onDelete && (
        <TouchableOpacity style={styles.trashIcon} onPress={onDelete}>
          <Ionicons name="trash" size={20} color="#ff4d4d" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  subtitle: {
    color: "#D9D9D9",
    fontSize: 12,
    marginTop: 2,
    textTransform: "uppercase",
  },
  actionIcon: {
    marginLeft: 8,
  },
  trashIcon: {
  marginLeft: 10,
  padding: 4,
},
});
