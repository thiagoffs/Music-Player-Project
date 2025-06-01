import { useEffect } from "react";
import { View, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { useMusics } from "@/Context/musicContext";
import * as MediaLibrary from "expo-media-library";
import type { Asset } from "expo-media-library";
import Music from "@/components/Music";
import Header from "@/components/Header";
import { initializeDatabase } from "@/database/initializeDatabase";
import { useDatabase, type MusicInfo } from "@/database/useDatabase";

import { usePlayTrack } from "@/store/playerSelectors";

export default function Index() {
  const { musics, setMusics } = useMusics();
  const [responsePermissions, requestPermissions] = MediaLibrary.usePermissions();
  const database = useDatabase();

  const playTrack = usePlayTrack();

  const getPermissions = async () => {
    if(responsePermissions?.status !== "granted"){
      await requestPermissions();
    }
  }

  const getMusics = async () => {
    await getPermissions();
    const foundMusics = await MediaLibrary.getAssetsAsync({ mediaType: "audio", first: 300 });
    const songs = {
      ...foundMusics,
      assets: foundMusics.assets.filter((music) => music.duration && music.duration > 90),
    };
    setMusics(songs);
    insertAllMusics(songs.assets);
  }

  const insertAllMusics = async (songs : MediaLibrary.Asset[] | undefined) => {    
    try {
      const existsDataOnAllMusics = (await database).existsDataOnAllMusicTable();
      if(await existsDataOnAllMusics === false) {
        songs?.forEach(async item => {
          const musicInfo : MusicInfo = {
            id: item.id,
            name: item.filename,
            path: item.uri,
            duration: item.duration
          };
          
          (await database).insertInAllMusicsTable(musicInfo);                    
        });
      }
    } catch(error) {
      console.log("Erro ao transicionar dados na tabela all_musics: ", error);
    }
  };

  useEffect(() => {
    initializeDatabase();
    getMusics();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
     <Header/>
      <View style={{ width: "100%", height: "100%"}}>        
        <FlatList
          data = { musics?.assets }
          keyExtractor={ infoItem => infoItem.id }
          renderItem ={ (infoItem) => 
          <Music  
              mode = "local"           
              url={ require("../../assets/icons/default-song.png") } 
              name = {infoItem.item.filename} 
              id = {infoItem.item.id}
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
