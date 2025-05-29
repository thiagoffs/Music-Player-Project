import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { usePlayer } from "@/Context/playerContext";
import { useState } from "react";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import defaultSongIcon from "@/assets/icons/default-song.png";
import { useDatabase } from "@/database/useDatabase";
import { useEffect } from "react";


export default function Player() {
  const [volume, setVolumeState] = useState(1);
  const { togglePlayPause, togglePreviousSong, toggleNextSong, currentTrack, isPlaying, position, duration, seekTo, setVolume } = usePlayer();
  const database = useDatabase();
  const [isFavorite, setIsFavorite] = useState(false);



  const addFavoriteMusic = async (musicId: string) => {
    const db = await database;
    await db.addFavoriteMusic(musicId);
  }
  const removeFavoriteMusic = async (musicId: string) => {
    const db = await database;
    await db.removeFavoriteMusic(musicId);
  }
  useEffect(() => {
    const checkFavorite = async () => {
      if (currentTrack?.id) {
        const favorite = await (await database).isFavoriteMusic(currentTrack.id);
        //console.log(currentTrack.id);
        setIsFavorite(favorite);
      }
    };
    checkFavorite();
  }, [currentTrack]);

  const formatMilliseconds = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeek = async (value: number) => {
    await seekTo(value);
  };

  const handleVolumeChange = (value: number) => {
    setVolumeState(value);
    setVolume(value);
  };
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
      //console.log("Músicas favoritas atualizadas:", updatedFavorites);

    } catch (err) {
      console.error("Erro ao alternar favorito:", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={defaultSongIcon} style={styles.image} />
      </View>
      <View
        style={[
          styles.sliderContainer,
          { gap: 5, marginTop: 38, marginBottom: 48 },
        ]}
      >
        <Text style={styles.text}>{formatMilliseconds(position)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          thumbTintColor="#435A88"
          minimumTrackTintColor="#FFF"
          maximumTrackTintColor="#FFF"
          value={position}
          step={1}
          onSlidingComplete={handleSeek}
        />
        <Text style={styles.text}>{formatMilliseconds(duration)}</Text>
      </View>
      <View style={styles.textDataMusic}>
        <Text
          style={[
            styles.text,
            { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
          ]}
        >
          {currentTrack?.name ?? "Desconhecida"}
        </Text>
        <Text style={[styles.text, { fontSize: 16 }]}>
          {currentTrack?.artist ?? "Desconhecido"}
        </Text>
      </View>
      <View style={styles.addToandFavoriteView}>
        <TouchableOpacity>
          <Ionicons
            name="list-outline"
            size={24}
            color="#FFF"
            style={{ marginTop: 20, marginBottom: 20 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color="#FFF"
            style={{ marginTop: 20, marginBottom: 20 }}
          />
        </TouchableOpacity>

      </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity>
          <Ionicons name="repeat" size={24} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.controls}>
          <TouchableOpacity onPress={togglePreviousSong}>
            <Ionicons name="play-skip-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={togglePlayPause}>
            <Ionicons
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={70}
              color="#FFF"
              style={{ marginHorizontal: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleNextSong}>
            <Ionicons name="play-skip-forward" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Ionicons name="shuffle" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
      <View style={[styles.sliderContainer, { gap: 15 }]}>
        <Ionicons name="volume-low-outline" size={24} color="#FFF" />
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={handleVolumeChange}
          thumbTintColor="#435A88"
          maximumTrackTintColor="#FFF"
          minimumTrackTintColor="#435A88"
        />
        <Ionicons name="volume-high-outline" size={24} color="#FFF" />
      </View>
      <TouchableOpacity
        onPress={() => console.log("Pressionado")}
        style={styles.touchableOpacity}
      >
        <Text style={{ color: "#FFF" }}>VER A LETRA</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    color: "#FFF",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#3A3535",
    alignItems: "center",
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
  image: {
    width: 150,
    height: 150,
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
  }
});