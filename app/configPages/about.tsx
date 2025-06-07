import { Alert,SafeAreaView, Linking, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function About() {
    const colors = useThemeColors();
    const router = useRouter();
    const OpenGitHubButton = (direction: string) => {
      if (direction === "github"){
        Linking.openURL(
          "https://github.com/PHCavalcante/music-player-project"
        ).catch((error) => {
          Alert.alert(
            "Erro ao abrir o link",
            "Não foi possível abrir o link do GitHub."
          );
        });
      } else if (direction === "reportBug") {
        Linking.openURL("https://github.com/PHCavalcante/Music-Player-Project/issues/new")
          .catch((error) => {
            Alert.alert(
              "Erro ao abrir o link",
              "Não foi possível abrir o link para reportar bugs."
            );
          });
      } else if (direction === "documentation") {
        Linking.openURL("https://github.com/PHCavalcante/Music-Player-Project/blob/main/README.md")
          .catch((error) => {
            Alert.alert(
              "Erro ao abrir o link",
              "Não foi possível abrir o link da documentação."
            );
          });
      };
    }
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
                <Text style={{ color: colors.text, fontSize: 24 }}>
                  Sobre
                </Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={() => OpenGitHubButton("github")}>
            <Ionicons name="logo-github" color={colors.text} size={35} />
            <View style={styles.textsView}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 24,
                  alignSelf: "flex-start",
                }}
              >
                Github
              </Text>
              <Text style={{ color: colors.secondary }}>
                Visite o repostirório do projeto no Github
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => OpenGitHubButton("reportBug")}>
            <Ionicons name="bug" color={colors.text} size={35} />
            <View style={styles.textsView}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 24,
                  alignSelf: "flex-start",
                }}
              >
                Reportar Bug
              </Text>
              <Text style={{ color: colors.secondary }}>
                Ajude a melhorar o projeto reportando bugs
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => OpenGitHubButton("documentation")}>
            <Ionicons name="book" color={colors.text} size={35} />
            <View style={styles.textsView}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 24,
                  alignSelf: "flex-start",
                }}
              >
                Documentação
              </Text>
              <Text style={{ color: colors.secondary }}>
                Confira a documentação do projeto
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  button: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 10,
  },
  textsView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});