import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useThemeColors } from "@/hooks/useThemeColor";
import Music from "../../components/Music";
import Header from "@/components/Header";
import { useDatabase, type MusicInfo } from "@/database/useDatabase";
import HomeSection from "@/components/HomeSection";
import { RelativePathString, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Home() {
  const [recentPlays, setRecentPlays] = useState<MusicInfo[] | null>([]);
  const [suggestion, setSuggestion] = useState<MusicInfo[] | null>([]);
  const [favorite, setFavorite] = useState<MusicInfo[] | null>([]);
  const colors = useThemeColors();
  const router = useRouter();
  const database = useDatabase();

  const suggestionSongs = async () => {
    try {
      if (suggestion !== null && suggestion.length > 0) return;
      const songs = (await database).queryRandomAllMusics();
      setSuggestion(await songs);
    } catch (error) {
      console.log(
        "Erro ao consultar dados aleatórios da tabela all_musics: ",
        error
      );
    }
  };
  const recentSongs = async () => {
    try {
      const songs = (await database).queryRecentPlaysMusics();
      if ((await songs).length === 0) {
        suggestionSongs();
      }
      setRecentPlays(await songs);
    } catch (error) {
      console.log("Erro ao transicionar dados no banco de dados: ", error);
    }
  };
  const favoriteSongs = async () => {
    const favorite = (await database).queryFavoriteMusics();
    setFavorite(await favorite);
  };

  useEffect(() => {
    recentSongs();
    favoriteSongs();
  }, [recentPlays, favorite]);
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Header />
      <ScrollView
        contentContainerStyle={{ paddingBottom: "10%" }}
        style={styles.scroll}
      >
        <View style={{ gap: 17 }}>
          <View style={styles.buttonRadio}>
            <Ionicons name="radio-outline" size={60} color={colors.text} />
            <TouchableOpacity
              onPress={() => router.push("/radio")}
              style={[styles.radioButton, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.text}>OUVIR RÁDIO</Text>
            </TouchableOpacity>
          </View>
          {recentPlays?.length === 0 ? (
            <View style={styles.recents}>
              <View style={styles.recentesTitle}>
                <Text style={styles.recentsTitleText}>
                  Recomendadas para Você
                </Text>
              </View>
              <ScrollView
                horizontal={true}
                contentContainerStyle={styles.listMusicCarrosel}
                showsHorizontalScrollIndicator={false}
              >
                {suggestion?.map((value, index) => {
                  return (
                    <Music
                      key={value.path ?? `${value.name} - ${index}`}
                      mode="grid"
                      name={value.name}
                      artist={value.artist ?? "Desconhecido(a)"}
                      url={
                        value.url ??
                        require("../../assets/icons/default-song.png")
                      }
                      path={value.path}
                    />
                  );
                })}
              </ScrollView>
            </View>
          ) : (
            <View style={styles.recents}>
              <View style={styles.recentesTitle}>
                <Text style={styles.recentsTitleText}>
                  Tocadas Recentemente
                </Text>
                <TouchableOpacity onPress={() => router.push("/list/recent")}>
                  <AntDesign name="arrowright" size={29} color="white" />
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal={true}
                contentContainerStyle={styles.listMusicCarrosel}
                showsHorizontalScrollIndicator={false}
              >
                {recentPlays?.map((value, index) => {
                  if (index < 4) {
                    return (
                      <Music
                        key={value.path ?? `${value.name} - ${index}`}
                        mode="grid"
                        name={value.name}
                        artist={value.artist ?? "Desconhecido(a)"}
                        url={
                          value.url ??
                          require("../../assets/icons/default-song.png")
                        }
                        path={value.path}
                      />
                    );
                  }
                })}
              </ScrollView>
            </View>
          )}
          <View style={styles.favorite}>
            <HomeSection
              title="Favoritas"
              route={"/list/favorites" as RelativePathString}
              colors={colors}
            />
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.listMusicCarrosel}
              showsHorizontalScrollIndicator={false}
            >
              {favorite?.map((value, index) => {
                if (index < 4) {
                  return (
                    <Music
                      key={value.path ?? `${value.name} - ${index}`}
                      mode="grid"
                      name={value.name}
                      artist={value.artist ?? "Desconhecido(a)"}
                      url={{
                        uri: value.url ?? "https://placecats.com/300/300",
                      }}
                      path={value.path}
                    />
                  );
                }
              })}
            </ScrollView>
          </View>

          <View>
            <HomeSection
              title="Playlists"
              route={"/list/playlists" as RelativePathString}
              colors={colors}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  scroll: {
    width: "100%",
    padding: "5%",
    flexDirection: "column",
  },
  radioButton: {
    borderRadius: 30,
    padding: 2,
    width: 183,
  },
  text: {
    fontSize: 24,
    textAlign: "center",
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
    marginBottom: 30,
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
    height: 230,
    paddingBottom: 20,
    alignItems: "baseline",
    alignContent: "flex-start",
    gap: 10,
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
    paddingHorizontal: 10,
    marginLeft: 0,
  },
});
