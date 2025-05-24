import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { usePlayer } from "@/Context/playerContext";
import { useMusics } from "@/Context/musicContext";
import * as MediaLibrary from "expo-media-library";
import type { Asset } from "expo-media-library";
import Music from "@/components/Music";
import Header from "@/components/Header";

//Primeira tela do App
export default function Index() {
  const { musics, setMusics } = useMusics();
  const [responsePermissions, requestPermissions] = MediaLibrary.usePermissions();
  const { playTrack } = usePlayer();

  const getPermissions = async () => {
    if(responsePermissions?.status !== "granted"){
      await requestPermissions();
    }
  }

  const getMusics = async () => {
    getPermissions();
    let foundMusics = await MediaLibrary.getAssetsAsync({ mediaType: "audio", first: 300 });
    const songs = {
      ...foundMusics,
      assets: foundMusics.assets.filter((music) => music.duration && music.duration > 90),
    };
    setMusics(songs);
  }

  useEffect(() => {
    getMusics();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
     <Header/>
      <View style={{ width: "100%", height: "100%"}}>        
        <FlatList
          data = { musics?.assets }
          renderItem ={ (infoItem) => 
          <Music  
              mode = "local"           
              url={ require("../../assets/icons/default-song.png") } 
              name = {infoItem.item.filename} 
              key = { infoItem.item.id }
              path = { infoItem.item.uri }
              artist = "Desconhecido(a)"   
              onPress = {() => playTrack(infoItem.item, musics?.assets as Asset[])}           
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
    backgroundColor: "#2F2A2A",
    paddingTop: "5%",    
  },
  recentsTitleText: {
    color: "#fff",
    fontSize: 24,
  },
});
