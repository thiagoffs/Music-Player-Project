import * as SQLite from "expo-sqlite";

export type MusicInfo = {
  id: string;
  name: string;
  artist?: string;
  url?: string;
  path: string;
  duration?: number;
};

export async function useDatabase() {
  const database = await SQLite.openDatabaseAsync("beatfy.db");

  async function queryRecentPlaysMusics() {
    const queryWithJoin =
      "SELECT all_musics.id, all_musics.name, all_musics.artist, all_musics.url, all_musics.path," +
      "all_musics.duration FROM recent_plays LEFT JOIN all_musics ON recent_plays.id_music = all_musics.id ORDER BY recent_plays.quantity_plays DESC";
    const response = await database.getAllAsync<MusicInfo>(queryWithJoin);
    return response;
  }

  async function existsDataOnAllMusicTable() {
    try {
      const response = await database.getAllAsync(`SELECT * FROM all_musics`);
      if (response.length > 0) return true;
      return false;
    } catch (error) {
      throw error;
    }
  }

  async function existsDataOnRecentPlays(id_music: string) {
    try {
      const response = await database.getFirstAsync(
        `SELECT * FROM recent_plays WHERE id_music = ${id_music}`
      );
      if (await response) return true;
      return false;
    } catch (error) {
      throw error;
    }
  }

  async function insertInAllMusicsTable(musicInfo: MusicInfo) {
    const statement = await database.prepareAsync(
      "INSERT INTO all_musics(id, name, artist, url, path, duration) VALUES ($id, $name, $artist, $url, $path, $duration)"
    );

    try {
      await statement.executeAsync({
        $id: musicInfo.id,
        $name: musicInfo.name,
        $artist: musicInfo.artist ? musicInfo.artist : null,
        $url: musicInfo.url ? musicInfo.url : null,
        $path: musicInfo.path,
        $duration: musicInfo.duration ? musicInfo.duration : null,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function insertInRecentPlaysTable(id_music: string) {
    const statement = await database.prepareAsync(
      "INSERT INTO recent_plays(id_music, quantity_plays) VALUES ($id_music, 1)"
    );

    try {
      await statement.executeAsync({
        $id_music: id_music,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function incrementQuantityPlays(id_music: string) {
    try {
      const quantityPlays = await database.getFirstAsync<{
        quantity_plays: number;
      }>(
        `SELECT quantity_plays FROM recent_plays WHERE id_music = ${id_music}`
      );
      if (quantityPlays) {
        const increment: number = quantityPlays.quantity_plays + 1;
        await database.runAsync(
          `UPDATE recent_plays SET quantity_plays = ${increment} WHERE id_music = ${id_music}`
        );
      }
    } catch (error) {
      throw error;
    }
  }
  async function addFavoriteMusic(id_music: string) {
    const statement = await database.prepareAsync(
      "INSERT INTO favorite_musics(id_music) VALUES ($id_music)"
    );

    try {
      await statement.executeAsync({ $id_music: id_music });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function removeFavoriteMusic(id_music: string) {
    try {
      await database.runAsync(
        `DELETE FROM favorite_musics WHERE id_music = $id_music`,
        {
          $id_music: id_music,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  async function isFavoriteMusic(id_music: string) {
    try {
      const result = await database.getFirstAsync(
        `SELECT * FROM favorite_musics WHERE id_music = $id_music`,
        {
          $id_music: id_music,
        }
      );

      return !!result;
    } catch (error) {
      throw error;
    }
  }

  async function queryFavoriteMusics() {
    const query = `
            SELECT all_musics.id, all_musics.name, all_musics.artist, all_musics.url, all_musics.path, all_musics.duration 
            FROM favorite_musics 
            LEFT JOIN all_musics ON favorite_musics.id_music = all_musics.id
        `;

    const response = await database.getAllAsync<MusicInfo>(query);
    return response;
  }

  return {
    queryRecentPlaysMusics,
    existsDataOnAllMusicTable,
    existsDataOnRecentPlays,
    insertInAllMusicsTable,
    insertInRecentPlaysTable,
    incrementQuantityPlays,
    addFavoriteMusic,
    removeFavoriteMusic,
    isFavoriteMusic,
    queryFavoriteMusics
  };
}