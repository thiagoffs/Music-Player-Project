import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useCurrentTrack } from "@/store/playerSelectors";
import { useThemeColors } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import defaultSongIcon from "@/assets/icons/default-song.png";

const { height: screenHeight } = Dimensions.get("window");

export default function Lyric() {
    const [lyric, setLyric] = useState<string[] | string>("");
    const currentTrack = useCurrentTrack();
    const colors = useThemeColors();
    const router = useRouter();

     const translateY = useSharedValue(0);

     useEffect(() => {
       translateY.value = withTiming(-screenHeight, {
         duration: 100000,
       });
     }, []);

     const animatedStyle = useAnimatedStyle(() => ({
       transform: [{ translateY: translateY.value }],
     }));
    const fetchLyric = async () => {
        try {
            const artist = currentTrack?.artist !== "Desconhecido(a)" ? currentTrack?.artist :currentTrack?.name?.split(" - ")[0];
            const title = currentTrack?.artist !== "Desconhecido(a)" ? currentTrack?.name :  currentTrack?.name?.split(" - ")[1];
            const response = axios.get(`https://api.lyrics.ovh/v1/${artist}/${title}`)
            const data = await response;
            setLyric(data.data.lyrics);
        } catch (error) {
            console.error("Error fetching lyrics:", error);
        }
    };
    useEffect(() => {
        fetchLyric();
    }, []);
    return (
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image
              source={currentTrack?.image ? { uri: currentTrack.image } : defaultSongIcon}
              style={{
                width: 30,
                height: 30,
                borderRadius: 10,
              }}
            />
          </View>
          <View style={styles.songDataView}>
            <Text style={[styles.songName, {color: colors.text}]}>
              {currentTrack?.name?.split(" - ")[0] || currentTrack?.name}
            </Text>
            <Text style={[styles.songArtist, {color: colors.text}]}>
              {currentTrack?.name?.split(" - ")[1] || currentTrack?.artist || "Desconhecido"}
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={25} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={{ height: screenHeight * 5, overflow: "scroll" }}>
          <Animated.View style={[styles.lyricView, animatedStyle]}>
            <Text style={[styles.lyric, {color: colors.text}]}>
              {lyric ?? "Desculpe, a letra da música não pode ser econtrada."}
            </Text>
          </Animated.View>
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    paddingTop: "5%",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: "#c1c1c1",
    borderStyle: "solid",
    borderColor: "#171C27",
    borderWidth: 1,
    borderRadius: 5,
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
  songDataView: {
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
  },
  songName: {
    color: "#fff",
    fontSize: 18,
  },
  songArtist: {
    color: "#fff",
    fontSize: 14,
  },
  lyricView: {
    width: "100%",
    height: "100%",
    padding: 20,
  },
  lyric: {
    fontSize: 24,
    textAlign: "center",
  }
});