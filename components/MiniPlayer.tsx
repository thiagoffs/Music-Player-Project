import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  BackHandler,
  Platform,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import defaultSongIcon from "@/assets/icons/default-song.png";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import {
  useCurrentTrack,
  useIsPlaying,
  useTogglePlayPause,
  useTogglePreviousSong,
  useToggleNextSong,
  usePosition,
  useDuration,
  useSeekTo,
  useSetVolume,
} from "@/store/playerSelectors";
import { useRouter } from "expo-router";
import { memo } from "react";
import { usePathname } from "expo-router";
import { useThemeColors } from "@/hooks/useThemeColor";
import Slider from "@react-native-community/slider";
import { useDatabase } from "@/database/useDatabase";

const { width: screenWidth } = Dimensions.get("window");

const formatMilliseconds = (milliseconds: number) => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const MiniPlayer = memo(function MiniPlayer() {
  const translateX = useSharedValue(0);
  const [textWidth, setTextWidth] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const currentTrack = useCurrentTrack();
  const isPlaying = useIsPlaying();
  const togglePlayPause = useTogglePlayPause();
  const togglePreviousSong = useTogglePreviousSong();
  const toggleNextSong = useToggleNextSong();
  const seekTo = useSeekTo();
  const position = usePosition();
  const duration = useDuration();
  const setVolume = useSetVolume();
  const colors = useThemeColors();
  const database = useDatabase();
  const router = useRouter();
  const pathname = usePathname();

  const handleToggle = () => setIsExpanded((prev) => !prev);

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
  useEffect(() => {
    const onBackPress = () => {
      if (isExpanded) {
        setIsExpanded(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => backHandler.remove();
  }, [isExpanded]);

  const handleSeek = useCallback(
    async (value: number) => {
      await seekTo(value);
    },
    [seekTo]
  );
  // const handleVolumeChange = (value: number) => {
  //   setVolumeState(value);
  //   setVolume(value);
  // };
  const handleVolumeChange = useCallback((value: number) => {
    setVolumeState(value);
    setVolume(value);
  }, []);
  const removeFavoriteMusic = async (musicId: string) => {
    const db = await database;
    await db.removeFavoriteMusic(musicId);
  };
  const addFavoriteMusic = async (musicId: string) => {
    const db = await database;
    await db.addFavoriteMusic(musicId);
  }

  const handleToggleFavorite = async () => {
    if (!currentTrack?.id) return;

    try {
      if (isFavorite) {
        await removeFavoriteMusic(currentTrack.id);
        setIsFavorite(false);
      } else {
        await addFavoriteMusic(currentTrack.id);
        setIsFavorite(true);
      }
      const db = await database;
      const updatedFavorites = await db.queryFavoriteMusics();
    } catch (err) {
      console.error("Erro ao alternar favorito:", err);
    }
  };

  if (!currentTrack || pathname === "/player" || pathname === "/lyric")
    return null;
  if (!isExpanded) {
    return (
      <TouchableOpacity
        style={[styles.container, { backgroundColor: colors.surface }]}
        onPress={handleToggle}
      >
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
            source={
              currentTrack.image ? { uri: currentTrack.image } : defaultSongIcon
            }
            style={{
              width: currentTrack.image ? "100%" : 25,
              height: currentTrack.image ? "100%" : 25,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.title, { color: colors.text }]}
            onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
          >
            {currentTrack.name}
          </Text>
          <Text style={[styles.artist, { color: colors.textSecondary }]}>
            {currentTrack.artist ?? "Artista desconhecido"}
          </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={togglePlayPause}>
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={30}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <View
      style={[styles.playerContainer, { backgroundColor: colors.background }]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={
            currentTrack?.image ? { uri: currentTrack.image } : defaultSongIcon
          }
          style={{
            width: currentTrack?.image ? "100%" : 150,
            height: currentTrack?.image ? "100%" : 150,
            borderRadius: currentTrack?.image ? 5 : 0,
          }}
        />
      </View>
      {Platform.OS === "ios" && (
        <TouchableOpacity
          onPress={handleToggle}
          style={{ position: "absolute", top: 30, right: 10 }}
        >
          <Ionicons name="chevron-down" size={30} color={colors.text} />
        </TouchableOpacity>
      )}
      <View
        style={[
          styles.sliderContainer,
          { gap: 5, marginTop: 38, marginBottom: 48 },
        ]}
      >
        <Text style={[styles.text, { color: colors.text }]}>
          {formatMilliseconds(position)}
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          thumbTintColor={colors.primary}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.primary}
          value={position}
          step={1}
          onSlidingComplete={handleSeek}
        />
        <Text style={[styles.text, { color: colors.text }]}>
          {formatMilliseconds(duration)}
        </Text>
      </View>
      <View style={styles.textDataMusic}>
        <Text
          style={[
            styles.text,
            {
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 20,
              color: colors.text,
            },
          ]}
        >
          {currentTrack?.name ?? "Desconhecida"}
        </Text>
        <Text
          style={[styles.text, { fontSize: 16, color: colors.textSecondary }]}
        >
          {currentTrack?.artist ?? "Desconhecido"}
        </Text>
      </View>
      <View style={styles.addToandFavoriteView}>
        <TouchableOpacity>
          <Ionicons
            name="list-outline"
            size={24}
            color={colors.text}
            style={{ marginTop: 20, marginBottom: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={colors.text}
            style={{ marginTop: 20, marginBottom: 20 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity>
          <Ionicons name="repeat" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.controls}>
          <TouchableOpacity onPress={togglePreviousSong}>
            <Ionicons name="play-skip-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePlayPause}>
            <Ionicons
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={70}
              color={colors.text}
              style={{ marginHorizontal: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleNextSong}>
            <Ionicons name="play-skip-forward" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Ionicons name="shuffle" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <View style={[styles.sliderContainer, { gap: 15 }]}>
        <Ionicons name="volume-low-outline" size={24} color={colors.text} />
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={handleVolumeChange}
          thumbTintColor={colors.primary}
          maximumTrackTintColor={colors.primary}
          minimumTrackTintColor={colors.primary}
        />
        <Ionicons name="volume-high-outline" size={24} color={colors.text} />
      </View>
      <TouchableOpacity
        onPress={() => router.push("/lyric")}
        style={[styles.touchableOpacity, { backgroundColor: colors.primary }]}
      >
        <Text style={{ color: colors.text }}>VER A LETRA</Text>
      </TouchableOpacity>
    </View>
  );
});
const styles = StyleSheet.create({
  // MiniPlayer styles
  container: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 60,
    width: "100%",
    zIndex: 10,
    overflow: "hidden",
  },
  title: {
    fontWeight: "bold",
    textOverflow: "nowrap",
  },
  artist: { color: "#ccc", fontSize: 12 },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  // Player styles
  text: {
    color: "#FFF",
    textAlign: "center",
  },
  playerContainer: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    height: "100%",
    paddingTop: 10,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 200,
    backgroundColor: "#c1c1c1",
    borderRadius: 35,
    boxShadow: "0px 4px 4px #171C27",
    marginTop: 40,
  },
  sliderContainer: {
    flexDirection: "row",
  },
  slider: {
    width: 242,
  },
  textDataMusic: {
    gap: 20,
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
    marginBottom: 40,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  touchableOpacity: {
    backgroundColor: "#5C83D2",
    boxShadow: "0px 4px 4px #171C27",
    paddingHorizontal: 23,
    paddingVertical: 10,
    borderRadius: 35,
    marginTop: 51,
    marginBottom: 34,
  },
  addToandFavoriteView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 40,
  },
});

export default MiniPlayer;
