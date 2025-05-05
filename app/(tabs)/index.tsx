import { useState, useEffect } from "react";
import { View, StyleSheet,Text, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import * as MediaLibrary from "expo-media-library";
import type { PagedInfo, Asset } from "expo-media-library";
import Music from "@/components/Music";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

//Primeira tela do App
export default function Index() {
  const [musics, setMusics] = useState<PagedInfo<Asset>>();
  const [responsePermissions, requestPermissions] = MediaLibrary.usePermissions();

  const getPermissions = async () => {
    if(responsePermissions?.status !== "granted"){
      await requestPermissions();
    }
  }

  const getMusics = async () => {
    let foundMusics = await MediaLibrary.getAssetsAsync({ mediaType: "audio" });
    setMusics(foundMusics);
  }

  useEffect(() => {
    getMusics();
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
                <TouchableOpacity>
                    <FontAwesome5 name="search" size={29} color="white" />
                </TouchableOpacity>
                <Text style={styles.recentsTitleText}>Nome do App</Text>
                <TouchableOpacity>
                    <Ionicons name="settings-sharp" size={29} color="white" />
                </TouchableOpacity>
        </View>

      <View>        
        <FlatList
          data = { musics?.assets }
          renderItem ={ (infoItem) => <Music  
              mode = "vertical"           
              url={{ uri: "https://placecats.com/300/300" }} 
              name = {infoItem.item.filename} 
              key = { infoItem.item.id }
              path = { infoItem.item.uri }
              artist = "Desconhecido(a)"              
            />          
          }
        />        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#2A2727",
    paddingTop: "5%",    
    paddingBottom: "30%",
  },
  header: {
    width: "90%",
    marginTop: 15,
    padding: 2,
    marginBottom: "10%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  recentsTitleText: {
    color: "#fff",
    fontSize: 24,
  },
});
