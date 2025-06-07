import { usePlaySelectedTrack } from "@/store/playerSelectors";
import { Image, Text, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

type TrendingSongsProps = {
  type: "trending" | "monthly" | "yearly" | "allTime" | "playlists" | "artists";
  colors: any;
}

export default function GetTrendingSongs({ type, colors }: TrendingSongsProps) {
  const [requestedResource, setRequestedResource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const playSelectedTrack = usePlaySelectedTrack();
  
  const urlMap: Record<string, string> = {
    trending: "https://discoveryprovider.audius.co/v1/tracks/trending",
    monthly: "https://discoveryprovider.audius.co/v1/tracks/trending?time=month",
    yearly: "https://discoveryprovider.audius.co/v1/tracks/trending?time=year",
    allTime: "https://discoveryprovider.audius.co/v1/tracks/trending?time=allTime",
    playlists: "https://discoveryprovider.audius.co/v1/playlists/trending",
  };

  const handlePress = useCallback((item:any) => {
     playSelectedTrack(
       item.id,
       item.title,
       item.user.name,
       item.artwork["480x480"]
     );
  }, [requestedResource])

  useEffect(() => {
    async function fetchTrending() {
        const url = urlMap[type];
        if (!url) return;
      setLoading(true);
      try {
        const response = await axios.get(url, {
          headers: { Accept: "application/json" },
        });

        if (response.data?.data) {
          setRequestedResource(response.data.data);
        } else {
          console.warn("Resposta inesperada:", response.data);
          setRequestedResource([]);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do tipo:", type, error);
        setRequestedResource([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTrending();
  }, [type]);

  if (loading) {
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 16, color: colors.text }}>
          Carregando músicas...
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      style={[styles.container, { backgroundColor: colors.background }]}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={requestedResource}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.id}
          style={styles.item}
          onPress={() => handlePress(item)}
        >
          <Image
            source={{ uri: item.artwork["150x150"] }} // possíveis valores aqui são 150x150, 480x480 e 1000x1000, mas ao testar valores maiores que 150x150 o app fica lento. Quanto maior a resolução, mais bonita a imagem fica
            style={styles.image}
          />
          <Text style={[styles.title, { color: colors.text }]}>
            {type !== "playlists" ? item.title : item.playlist_name}
          </Text>
          <Text style={[styles.artist, { color: colors.textSecondary }]}>
            {type !== "playlists" ? item.user.name : ""}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    flexGrow: 0,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    maxWidth: 130,
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  item: {
    padding: 10,
    maxWidth: 130,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  artist: {
    color: "#c1c1c1",
    fontSize: 12,
    maxWidth: 130,
  },
  image: {
    width: 105,
    height: 105,
    borderRadius: 20,
  }
});
