import * as SQLite from "expo-sqlite";

export type MusicInfo = {
    id : string,
    name : string,
    artist ? : string,
    url ? : string,
    path : string,
    duration ? : number
}

export async function useDatabase() {
    const database = await SQLite.openDatabaseAsync("beatfy.db");

    async function existsDataOnAllMusicTable() {
        try {
            const response = await database.getAllAsync(`SELECT * FROM all_musics`);
            if(response.length > 0) return true;
            return false;
        } catch(error) {
            throw error;
        }
    }
    
    async function existsDataOnRecentPlays(id_music : string) {
        try {
            const response = await database.getFirstAsync(`SELECT * FROM recent_plays WHERE id_music = ${id_music}`);
            if(await response) return true;
            return false;
        } catch(error) {
            throw error;
        }
    }

    async function insertInAllMusicsTable(musicInfo : MusicInfo) { 
        const statement = await database.prepareAsync(
            "INSERTO INTO all_musics(id, name, artist, url, path, duration) VALUES ($id, $name, $artist, $url, $path, $duration)"
        );

        try {
            await statement.executeAsync({
                $id: musicInfo.id,
                $name: musicInfo.name,
                $artist: musicInfo.artist ? musicInfo.artist : null,
                $url: musicInfo.url ? musicInfo.url : null,
                $path: musicInfo.path,
                $duration: musicInfo.duration ? musicInfo.duration : null
            });
        } catch(error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function insertInRecentPlaysTable(id_music : string) {
        const statement = await database.prepareAsync(
            "INSERTO INTO recent_plays(id_music, quantity_plays) VALUES ($id_music, 1)"
        );

        try {
            await statement.executeAsync({
                $id_music: id_music
            });
        } catch(error) {
            throw error;
        } finally {
            await statement.finalizeAsync();
        }
    }

    async function incrementQuantityPlays(id_music : string) {
        try {
            const quantityPlays = await database.getFirstAsync<number>(`SELECT quantity_plays FROM recent_plays WHERE id_music = ${id_music}`);
            if(quantityPlays) {
                const increment = quantityPlays + 1;
                await database.runAsync(`UPDATE recent_plays SET quantity_plays = ${increment} WHERE id_music = ${id_music}`);
            } 
        } catch(error) {
            throw(error)
        }        
    }

    return { existsDataOnAllMusicTable, existsDataOnRecentPlays, insertInAllMusicsTable, insertInRecentPlaysTable, incrementQuantityPlays };
}