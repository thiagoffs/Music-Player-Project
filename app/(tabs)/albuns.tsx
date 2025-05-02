import { View, StyleSheet,Text, SafeAreaView} from "react-native";

//Tela Album
export default function Album() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={{fontSize:30, color:"#fff",textAlign:"center"}}>Tela Álbuns</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2A2727",
  },
  content: {
    flex: 1,
  },
  
});
