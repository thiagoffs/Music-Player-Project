import { SafeAreaView, View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColor";
import { useThemeStore } from "@/store/themeStore";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Personalization() {
  const colors = useThemeColors();
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const theme = useThemeStore((state) => state.theme);
  const router = useRouter();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            color={colors.text}
            size={30}
            onPress={() => router.back()}
          />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>
          Personalização
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ color: colors.text }}>Dark Mode</Text>
        <Switch
          value={theme === "dark"}
          onValueChange={toggleTheme}
          trackColor={{ false: colors.secondary, true: colors.primary }}
          thumbColor={true ? colors.primary : colors.secondary}
          ios_backgroundColor="#3e3e3e"
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: "100%",
    paddingTop: "10%",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    gap: 30,
  },
  title: {
    fontSize: 24,
  },
});
