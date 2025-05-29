import axios from "axios";
import { Image, Text, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useState, useEffect } from "react";
import { usePlaySelectedTrack } from "@/hooks/usePlaySelectedTask";

type TrendingSongsProps = {
  type: "trending" | "monthly" | "yearly" | "allTime" | "playlists" | "artists";
}

export default function GetTrendingSongs({ type }: TrendingSongsProps) {
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

  // console.log(requestedResource);
  if (loading) {
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 16, color: "#fff" }}>
          Carregando músicas...
        </Text>
      </View>
    );
  }
  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {requestedResource.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.item}
          onPress={() => {
            playSelectedTrack(
              item.id,
              item.title,
              item.user.name,
              item.artwork["480x480"]
            );
            console.log(item.artwork);
          }}
        >
          <Image
            source={{ uri: item.artwork["150x150"] }} // possíveis valores aqui são 150x150, 480x480 e 1000x1000, mas ao testar valores maiores que 150x150 o app fica lento. Quanto maior a resolução, mais bonita a imagem fica
            style={styles.image}
          />
          <Text style={styles.title}>
            {type !== "playlists" ? item.title : item.playlist_name}
          </Text>
          <Text style={styles.artist}>
            {type !== "playlists" ? item.user.name : ""}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    flexGrow: 0,
  },
  title: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    maxWidth: 130,
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  item: {
    padding: 10,
    maxWidth: 130,
    // maxHeight: 150,
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
