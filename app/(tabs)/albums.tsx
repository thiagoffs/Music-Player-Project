import Header from "@/components/Header";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColor";

export default function Album() {
  const colors = useThemeColors();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header />
      <View style={styles.content}>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20
  },
  content: {
    flex: 1,
  },
});
