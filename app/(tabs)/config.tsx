import Header from "@/components/Header";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";

//Tela Album
export default function Config() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={{ fontSize: 30, color: "#fff", textAlign: "center" }}>Tela de configurações</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2F2A2A",
    flex: 1,
    alignItems: "center",
    paddingTop: 20
  },
  content: {
    flex: 1,
  },

});
