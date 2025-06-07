import { View, Text, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { usePlayTrack } from "@/store/playerSelectors";
import { useThemeColors } from "@/hooks/useThemeColor";


type Props = {
    id?: string;
    name?: string;
    artist?: string;
    url: ImageSourcePropType;
    mode?: "horizontal" | "vertical" | "grid" | "local";
    path?: string;
    onPress?: () => void;
    colors?: any
};

type Track = {
    id: string,
    uri: string;
    fileName?: string;
    artist?: string;
    image?: string;
    name: string;
};

export default function Music({ name, url, artist, mode = "horizontal", path, id, onPress, colors }: Props) {
    if (mode === "horizontal") {
        return <HorizontalMusicIcon name={name} url={url} />
    } else if (mode == "vertical") {
        return <VerticalMusicIcon name={name} artist={artist} url={url} />
    } else if (mode == "grid") {
        return <GridMusicIcon name={name} artist={artist} url={url} onPress={onPress} />
    } else {
        return <LocalMusicIcon name={name} artist={artist} url={url} path={path} id={id} onPress={onPress} colors={colors} />
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
function GridMusicIcon({ name, url, artist, onPress }: { name?: string; url: ImageSourcePropType; artist?: string; onPress?: () => void; }) {
    const themeColors = useThemeColors();
    return (
        <TouchableOpacity style={styles.songGrid} onPress={onPress}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <View style={styles.fotoGridContainer}>
                    <Image source={url} style={styles.styleFotoGrid} />
                </View>
                <Text style={[styles.songTitleGrid, { color: themeColors.text }]} numberOfLines={3}>{name?.split(".")[0]}</Text>
                <Text style={[styles.songSubTitleGrid, { color: themeColors.textSecondary }]} numberOfLines={1}>{artist}</Text>
            </View>
        </TouchableOpacity>

    );
}
function LocalMusicIcon({ name, url, artist, path, id, colors }: Props) {
    const formattedName = name?.split(".");
    const playTrack = usePlayTrack();
    return (
        <TouchableOpacity
            onPress={async () => {
                const assets = await MediaLibrary.getAssetsAsync({ mediaType: "audio", first: 300 });
                playTrack(
                    { id: id ?? "", uri: path ?? "", name: formattedName![0], artist },
                    assets.assets.map((asset) => ({
                        id: asset.id,
                        uri: asset.uri,
                        name: asset.filename ? asset.filename.split(".")[0] : "Unknown",
                        url: asset.albumId
                            ? `album-${asset.albumId}`
                            : require("../assets/icons/default-song.png"),
                        image: require("../assets/icons/default-song.png"),
                    })) as Track[]
                );
            }}
            style={{
                width: "100%",
                flexDirection: "row",
                alignContent: "flex-start",
                alignItems: "center",
                justifyContent: "flex-start",
                marginVertical: 10,
                paddingHorizontal: 10,
            }}
        >
            <View style={{ width: 40, height: 40, backgroundColor: "#c1c1c1", alignItems: "center", justifyContent: "center", borderRadius: 5 }}>
                <Image source={url} style={{ width: 25, height: 25 }} />
            </View>
            <View style={{ flexDirection: "column", paddingLeft: 10, flex: 1 }}>
                <Text style={[styles.localTittle, { color: colors?.text ?? "#FFFFFF" }]}>{formattedName![0]}</Text>
                <Text style={[styles.localArtistName, { color: colors?.textSecondary ?? "#AAAAAA" }]}>
                    {artist}</Text>
            </View>
        </TouchableOpacity>
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
    fotoGridContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 122,
        backgroundColor: "#C1C1C1",
        borderRadius: 35,
        marginBottom: 10,
        boxShadow: "0px 4px 4px #171C27",
    },
    styleFotoGrid: {
        width: "100%",
        height: "100%",
        resizeMode: "center",
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
        textAlign: "center",
    },
    songSubTitleGrid: {
        fontSize: 13,
        color: "#A19E9E",
        textAlign: "center"
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