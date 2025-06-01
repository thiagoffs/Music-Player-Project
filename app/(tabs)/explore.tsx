import { View, StyleSheet, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity, Image} from "react-native";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import GetTrendingSongs from "@/utils/GetTrendings";
import { usePlaySelectedTrack } from "@/store/playerSelectors";
import axios from "axios";

export default function Explore() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const playSelectedTrack = usePlaySelectedTrack();

    useEffect(() => {
      const fetchSearchResults = async () => {
          try{
            const response = axios.get(`https://discoveryprovider.audius.co/v1/tracks/search?query=${searchQuery}`,);
            const data = (await response).data.data;
            if (data && Array.isArray(data)) {
              setSearchResults(data);
            }
            else {
              console.warn("Resposta inesperada:", data);
              setSearchResults([]);
            }
          }
          catch (error) {
            console.error("Erro ao buscar resultados da pesquisa:", error);
          }
      };
      if (searchQuery.length > 0) fetchSearchResults();
    }, [searchQuery]);

    if (searchQuery){
      return (
        <SafeAreaView style={styles.container}>
          <Header />
          <TextInput
            placeholder="Oque você está procurando?"
            placeholderTextColor="#fff"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            style={{
              backgroundColor: "#3C3C3C",
              width: "90%",
              height: 40,
              borderRadius: 10,
              paddingLeft: 10,
              color: "#fff",
              marginTop: 20,
            }}
          />
          <ScrollView style={{ marginTop: 30 }}>
            {searchResults.map((result, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  marginBottom: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
                onPress={() => playSelectedTrack(result.id, result.title, result.user.name, result.artwork["150x150"])}
              >
                <Image
                  source={{ uri: result.artwork["150x150"] }}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 5,
                  }}
                />
                <View>
                  <Text style={{ color: "#fff" }}>{result.title}</Text>
                  <Text style={{ color: "#aaa" }}>{result.user.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <TextInput
          placeholder="Oque você está procurando?"
          placeholderTextColor="#fff"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          style={{
            backgroundColor: "#3C3C3C",
            width: "90%",
            height: 40,
            borderRadius: 10,
            paddingLeft: 10,
            color: "#fff",
            marginTop: 20,
          }}
        />
        <ScrollView style={{ marginTop: 30 }} showsVerticalScrollIndicator={false}>
          <View>
            <Text style={styles.sectionTitle}>Populares no momento</Text>
            <GetTrendingSongs type={"trending"} />
          </View>
          <View>
            <Text style={styles.sectionTitle}>Populares este mês</Text>
            <GetTrendingSongs type={"monthly"} />
          </View>
          <View>
            <Text style={styles.sectionTitle}>As mais populares</Text>
            <GetTrendingSongs type={"allTime"} />
          </View>
          <View>
            <Text style={styles.sectionTitle}>Playlists populares</Text>
            <GetTrendingSongs type={"playlists"} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2F2A2A",
        flex: 1,
        alignItems: "center",
        paddingTop: "10%",
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        alignSelf: "flex-start",
        textAlign: "left",
        marginLeft: 10,
    }
});
