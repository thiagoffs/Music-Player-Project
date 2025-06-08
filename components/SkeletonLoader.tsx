import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function SkeletonLoader() {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.3, { duration: 800 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.skeletonBox, animatedStyle ]} />
      <View style={styles.skeletonTextView}>
        <Animated.View style={[styles.skeletonTitle, animatedStyle]} />
        <Animated.View style={[styles.skeletonText, animatedStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  skeletonBox: {
    width: 100,
    height: 100,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  skeletonTextView: {
    flexDirection: "column",
  },
  skeletonTitle: {
    width: 100,
    height: 20,
    backgroundColor: "#e0e0e0",
    marginTop: 5,
    borderRadius: 4,
  },
  skeletonText: {
    width: 80,
    height: 15,
    backgroundColor: "#e0e0e0",
    marginTop: 5,
    borderRadius: 4,
  },
});
