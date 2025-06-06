import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import defaultSongIcon from "@/assets/icons/default-song.png";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import { useCurrentTrack, 
  useIsPlaying,
  useTogglePlayPause,
  useTogglePreviousSong,
  useToggleNextSong
  } from "@/store/playerSelectors";
import { useRouter } from "expo-router";
import { usePathname } from "expo-router";

const { width: screenWidth } = Dimensions.get("window");

export default function MiniPlayer() {
  const translateX = useSharedValue(0);
  const [textWidth, setTextWidth] = useState(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  const currentTrack = useCurrentTrack();
  const isPlaying = useIsPlaying();
  const togglePlayPause = useTogglePlayPause();
  const togglePreviousSong = useTogglePreviousSong();
  const toggleNextSong = useToggleNextSong();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (textWidth > screenWidth) {
      const totalDistance = textWidth + screenWidth;

      translateX.value = withRepeat(
        withTiming(-textWidth, {
          duration: (totalDistance / 50) * 1000,
          easing: Easing.linear,
        }),
        -1,
        false
      );
    }
  }, [textWidth]);

  if (!currentTrack || pathname === "/player" || pathname === "/lyric" || pathname ==="/choosePlaylist") return null;
  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push("/player")}>
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: "#c1c1c1",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 5,
          marginRight: 10,
          marginLeft: 5,
        }}
      >
        <Image
          source={currentTrack.image ? { uri: currentTrack.image } : defaultSongIcon}
          style={{ width: currentTrack.image ? "100%" : 25, height: currentTrack.image ? "100%" : 25, borderRadius: 5 }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Animated.Text
          style={[styles.title, animatedStyle]}
          onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
        >
          {currentTrack.name}
        </Animated.Text>
        <Text style={styles.artist}>
          {currentTrack.artist ?? "Artista desconhecido"}
        </Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={togglePreviousSong}>
          <Ionicons name={"play-back"} size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={30}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleNextSong}>
          <Ionicons name={"play-forward"} size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3A3535",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "#333",
    borderTopWidth: 1,
    position: "absolute",
    bottom: 60,
    width: "100%",
    zIndex: 10,
    overflow: "hidden",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    textOverflow: "nowrap",
  },
  artist: { color: "#ccc", fontSize: 12 },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
