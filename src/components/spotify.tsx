import { setSpotifyStatus } from "@/lib/spotify";
import Image from "next/image";
import { FaSpotify, FaPodcast } from "react-icons/fa6";

export const dynamic = "force-dynamic";

async function NowPlayingWidget() {
  const nowPlaying = await setSpotifyStatus();

  if (!nowPlaying) return;
  if (nowPlaying.currently_playing_type == "ad") return;

  if (nowPlaying.currently_playing_type == "episode") {
    return (
      <div className="flex items-center gap-4 p-3 rounded-lg bg-foreground/[0.03] hover:bg-foreground/[0.05] transition-colors">
        <div className="relative w-16 h-16 flex-shrink-0">
          <FaPodcast className="w-full h-full opacity-80" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 text-sm opacity-80">
            <FaSpotify className="text-[#1DB954]" />
            <span>Spotify - Now Playing</span>
          </div>
          <h2 className="text-base font-medium truncate">Podcast</h2>
        </div>
      </div>
    );
  }

  let artists = nowPlaying.item.artists.map((artist: { name: string }) => artist.name).join(", ");
  if (artists.length > 30) {
    artists = artists.slice(0, 30) + "...";
  }

  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-foreground/[0.03] hover:bg-foreground/[0.05] transition-colors">
      <div className="relative w-16 h-16 flex-shrink-0">
        <Image
          src={nowPlaying.item.album.images[0].url}
          alt={nowPlaying.item.name}
          className="rounded-md object-cover"
          fill
          unoptimized
        />
      </div>
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-1.5 text-sm opacity-80">
          <FaSpotify className="text-[#1DB954]" />
          <span>Spotify - Now Playing</span>
        </div>
        <h2 className="text-base font-medium truncate">{nowPlaying.item.name}</h2>
        <p className="text-sm opacity-60 truncate">{artists}</p>
      </div>
    </div>
  );
}

export default NowPlayingWidget;
