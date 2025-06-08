import axios from "axios";
import { usePlayer } from "../Context/playerContext";
import type { Track } from "../Context/playerContext";

export function usePlaySelectedTrack(){ 
  const { playTrack } = usePlayer();

  const playSelectedTrack = async (
    trackId: string,
    trackName: string,
    artist: string,
    trackImage: string
  ) => {
    try {
      const response = await axios.get(
        `https://api.audius.co/v1/tracks/${trackId}/stream`,
        {
          maxRedirects: 0,
          validateStatus: (status) => status >= 200 && status < 400,
        }
      );
      const streamUrl = response.request.responseURL;
      if (streamUrl) {
        const track: Track = {
          uri: streamUrl,
          name: trackName,
          artist,
          image: trackImage,
        };
        playTrack(track);
      }
    } catch (error: any) {
      if (error.response?.status === 302) {
        playTrack(error.response.headers.location);
        return;
      }
      console.error("Error fetching track stream:", error);
    }
  };
  return playSelectedTrack;
};
