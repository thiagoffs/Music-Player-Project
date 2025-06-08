import * as SQLite from "expo-sqlite";

export async function initializeDatabase() {
    const database = await SQLite.openDatabaseAsync("beatfy.db");
    await database.execAsync(`
        CREATE TABLE IF NOT EXISTS all_musics(
            id TEXT PRIMARY KEY NOT NULL,
            name TEXT NOT NULL,
            artist TEXT DEFAULT "Desconhecido(a)",
            url TEXT,
            path TEXT NOT NULL,
            duration REAL
        );

        CREATE TABLE IF NOT EXISTS recent_plays(            
            id_music TEXT NOT NULL,
            quantity_plays INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY (id_music) REFERENCES all_musics(id)
        );
          CREATE TABLE IF NOT EXISTS favorite_musics(
            id_music TEXT PRIMARY KEY NOT NULL,
            FOREIGN KEY (id_music) REFERENCES all_musics(id)
        );
        
         CREATE TABLE IF NOT EXISTS playlists (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
         );

        CREATE TABLE IF NOT EXISTS playlist_music (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            playlist_id INTEGER NOT NULL,
            music_id TEXT NOT NULL,
            FOREIGN KEY (playlist_id) REFERENCES playlists(id),
            FOREIGN KEY (music_id) REFERENCES all_musics(id)
        );
    `);
}