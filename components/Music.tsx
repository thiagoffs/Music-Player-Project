import { View, Text, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
    key: string;
    name?: string;
    artist?: string;
    url: ImageSourcePropType;
    mode?: "horizontal" | "vertical" | "grid" | "local";
    path: string;
};
export default function Music({ name, url, artist, mode = "horizontal" }: Props) {
    if (mode === "horizontal") {
        return <HorizontalMusicIcon name={name} url={url} />
    } else if (mode == "vertical") {
        return <VerticalMusicIcon name={name} artist={artist} url={url} />
    } else if (mode == "grid") {
        return <GridMusicIcon name={name} artist={artist} url={url} />
    } else {
        return <LocalMusicIcon name={name} artist={artist} url={url} />
    }
}
function HorizontalMusicIcon({ name, url }: { name?: string; url: ImageSourcePropType }) {
    return (
        <TouchableOpacity style={styles.songHorizontal}>
            <Image source={url} style={styles.styleFoto} />
            <Text style={styles.songTitleHorizontal}>{name}</Text>
        </TouchableOpacity>
    );
}
function VerticalMusicIcon({ name, url, artist }: { name?: string; url: ImageSourcePropType; artist?: string }) {
    return (
        <View>
            <TouchableOpacity style={styles.songVertical}>
                <Image source={url} style={styles.styleFoto} />
                <View style={{ borderColor: "white", margin: 15 }}>
                    <Text style={styles.songTitleVertical}>{name}</Text>
                    <Text style={styles.songSubTitleVertical}>{artist}</Text>
                </View>
            </TouchableOpacity>
        </View>

    );
}
function GridMusicIcon({ name, url, artist }: { name?: string; url: ImageSourcePropType; artist?: string }) {
    return (
        <TouchableOpacity style={styles.songGrid}>
            <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Image source={url} style={styles.styleFotoGrid} />
                <Text style={styles.songTitleGrid}>{name}</Text>
                <Text style={styles.songSubTitleGrid}>{artist}</Text>
            </View>
        </TouchableOpacity>

    );
}
function LocalMusicIcon({ name, url, artist }: { name?: string; url: ImageSourcePropType; artist?: string }) {
    const formattedName = name?.split(".");
    return (
      <View
        style={{ width: "100%", marginVertical: 10, paddingHorizontal: 10 }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            flexDirection: "row",
            alignContent: "flex-start",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <View style={{ width: 40, height: 40, backgroundColor: "#c1c1c1", alignItems: "center", justifyContent: "center", borderRadius: 5 }}>
            <Image source={url} style={{ width: 25, height: 25 }} />
          </View>
          <View style={{ flexDirection: "column", paddingLeft: 10 }}>
            <Text style={styles.localTittle}>{formattedName![0]}</Text>
            <Text style={styles.localArtistName}>{artist}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
} 
const styles = StyleSheet.create({
    styleFoto: {
        width: 97,
        height: 90,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 10,
        marginVertical: 10
    },
    styleFotoGrid: {
        width: "100%",
        height: 122,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "white",
        resizeMode:"cover"
    },
    songHorizontal: {
        marginVertical: 10
    },
    songTitleHorizontal: {
        fontSize: 15,
        color: "white",
        textAlign: "center"
    },
    songVertical: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        width: "65%"

    },
    songTitleVertical: {
        fontSize: 20,
        textAlign: "center",
        color: "white",
    },
    songSubTitleVertical: {
        fontSize: 13,
        textAlign: "center",
        color: "#A19E9E",
    },
    songGrid: {
        width: 147,
    },
    songTitleGrid: {
        fontSize: 20,
        color: "white",
        textAlign:"center"
    },
    songSubTitleGrid: {
        fontSize: 13,
        color: "#A19E9E",
        textAlign:"center"
    },
    localTittle: {
        fontSize: 14,
        textAlign: "left",
        color: "#fff"
    },
    localArtistName: {
        fontSize: 12,
        textAlign: "left",
        color: "#c1c1c1"
    }
})