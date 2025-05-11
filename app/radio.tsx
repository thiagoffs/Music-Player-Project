import { SafeAreaView, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider"; 
import { Sound } from "expo-av/build/Audio";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function Radio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Sound | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const volume = useRef(0.5);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ),
      -1,
      true
    );
     opacity.value = withRepeat(
       withSequence(
         withTiming(0.5, { duration: 500 }),
         withTiming(1, { duration: 500 })
       ),
       -1,
       true
     );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
      };
    }
  );

  const playAudio = async () => {
    setIsLoading(true);
    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: "https://stream.zeno.fm/qnozhn4xig7uv",
      });
      setSound(sound);
      setIsPlaying(true);
      await sound.playAsync();
    } catch (error) {
      console.error("Erro ao reproduzir áudio:", error);
    }
    setIsLoading(false);
  };
  const stopAudio = async () => {
    try {
      await sound?.stopAsync();
      setIsPlaying(false);
      // await sound?.unloadAsync();
    } catch (error) {
      console.error("Erro ao parar áudio:", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Animated.Image
          source={require("../assets/images/ion_radio.png")}
          style={
            isPlaying ? [styles.radioImage, animatedStyle] : styles.radioImage
          }
        />
        <View style={styles.controlsButtons}>
          <TouchableOpacity
            onPress={isPlaying ? stopAudio : playAudio}
            style={styles.playButton}
          >
            <ActivityIndicator
              size={"large"}
              color={"#000000"}
              animating={isLoading}
              hidesWhenStopped={true}
              style={styles.activityIndicator}
            />
            <Image
              source={
                isPlaying
                  ? require("../assets/icons/pause.png")
                  : require("../assets/icons/play.png")
              }
              style={
                isLoading
                  ? styles.playButtonImageAllWhite
                  : styles.playButtonImage
              }
            />
          </TouchableOpacity>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            thumbTintColor="#435A88"
            minimumTrackTintColor="#435A88"
            maximumTrackTintColor="#FFF"
            value={volume.current}
            step={0.01}
          
            onValueChange={(value) => {
              volume.current = value;
              if (sound) {
                sound.setVolumeAsync(value);
              }
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#2F2A2A",
    flex: 1,
    alignItems: "center",
  },
  radioImage: {
    marginTop: 50,
  },
  controlsButtons: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    margin: "auto"
  },
  slider: {
    width: 250,
    height: 40,
  },
  playButton: {
    position: "relative",
  },
  activityIndicator: {
    position: "absolute",
    zIndex: 1,
    inset: 0,
    margin: "auto",
    width: 80,
    height: 80,
    transform: [{ scale: 1.5}],
  },
  playButtonImage: {
    width: 80,
    height: 80,
  },
  playButtonImageAllWhite: {
    filter: "brightness(1000%)",
    width: 80,
    height: 80,
  }
});
