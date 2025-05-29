import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import { usePlayer } from "@/Context/playerContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { height: screenHeight } = Dimensions.get("window");

export default function Lyric() {
    const [lyric, setLyric] = useState<string[] | string>("");
    const { currentTrack } = usePlayer();
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
            const artist = currentTrack?.name?.split(" - ")[0];
            const title = currentTrack?.name?.split(" - ")[1];
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
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image
              source={require("@/assets/icons/default-song.png")}
              style={{
                width: 30,
                height: 30,
                borderRadius: 10,
              }}
            />
          </View>
          <View style={styles.songDataView}>
            <Text style={styles.songName}>
              {currentTrack?.name?.split(" - ")[0]}
            </Text>
            <Text style={styles.songArtist}>
              {currentTrack?.name?.split(" - ")[1]}
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={{ height: screenHeight * 5, overflow: "scroll" }}>
          <Animated.View style={[styles.lyricView, animatedStyle]}>
            <Text style={styles.lyric}>
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
    backgroundColor: "#2F2A2A",
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
    borderRadius: 5,
    boxShadow: "0px 4px 4px #171C27",
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
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
  }
});