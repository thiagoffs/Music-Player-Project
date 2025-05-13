import Header from "@/components/Header";
import Music from "@/components/Music";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity, FlatList } from "react-native";

const foto = "https://placecats.com/300/300";

const mockData = {
    recent: [
        { id: "1", title: "My Way", image: foto },
        { id: "2", title: "Breathe", image: foto },
        { id: "3", title: "Sad But True", image: foto },
        { id: "11", title: "Californication", image: foto },
        { id: "12", title: "High Hopes", image: foto },
        { id: "13", title: "No Surprises", image: foto },
        { id: "14", title: "Everlong", image: foto },
        { id: "15", title: "Dream On", image: foto },
        { id: "16", title: "Runaway", image: foto },
        { id: "17", title: "Come As You Are", image: foto },
        { id: "18", title: "Bittersweet Symphony", image: foto },
        { id: "19", title: "Mr. Brightside", image: foto },
        { id: "20", title: "Fix You", image: foto },
        { id: "21", title: "Boulevard of Broken Dreams", image: foto },
        { id: "22", title: "Chasing Cars", image: foto },
        { id: "23", title: "Black Hole Sun", image: foto },
        { id: "24", title: "In the End", image: foto },
        { id: "25", title: "Under the Bridge", image: foto }

    ],
    favorites: [
        { id: "4", title: "Mr. Fear", image: foto },
        { id: "5", title: "Borderline", image: foto },
        { id: "6", title: "Decida", image: foto },
    ],
    albums: [
        { id: "7", title: "Plastic Beach", image: foto },
        { id: "8", title: "True Defiance", image: foto },
        { id: "9", title: "20 Super Sucessos", image: foto },
    ],
    playlists: [
        { id: "10", title: "Ficar Monstrão", image: foto },
        { id: "11", title: "As Melhores Clássicas", image: foto },
    ],
};

const titlesPages: Record<keyof typeof mockData, string> = {
    recent: "Tocadas recentemente",
    favorites: "Favoritas",
    albums: "Álbuns",
    playlists: "Playlists",
};

const validTypes = ["recent", "favorites", "albums", "playlists"] as const;
type TypeKey = typeof validTypes[number];

export default function PageList() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const type = params.type;

    if (typeof type !== "string" || !validTypes.includes(type as TypeKey)) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>
                    Tipo inválido ou não encontrado.
                </Text>
            </SafeAreaView>
        );
    }

    const typedType = type as TypeKey;
    const items = mockData[typedType];
    const title = titlesPages[typedType];

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.content}>
                <View style={styles.containerTitlePage}>
                    <TouchableOpacity onPress={() => router.push("../home")}>
                        <AntDesign name="arrowleft" size={29} color="white" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 20, color: "#fff", paddingHorizontal: 20}}>{title}</Text>
                </View>

                <FlatList
                    style={styles.flatList}
                    data={items}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.containerViewFlatList}>
                            <Text style={{ color: "white", margin: 10, textAlign: "center" }}>{item.title}</Text>
                            <Music url={{ uri: item.image }} mode="grid" key={""} path={""} />
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2F2A2A",
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
        minWidth:200

    },
    content: {
        flex: 1,
    },
    containerTitlePage: {
        flexDirection: "row",
        padding: 20,
        alignItems: "center",
        minWidth:"100%",

    },
    flatList: {
        // borderWidth: 1,
        // borderColor: "red",
    },
    containerViewFlatList: {
        //borderWidth: 1,
        maxWidth: "50%",
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        borderColor: "white",
    }
});
