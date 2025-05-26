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
    `);
}