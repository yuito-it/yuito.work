import { setSpotifyStatus } from "@/lib/spotify.mjs";
import Image from 'next/image';

export const NowPlayingWidget = async () => {
    const nowPlaying = await setSpotifyStatus();
    if (!nowPlaying) return null;
    let artists = nowPlaying.item.artists.map((artist: { name: string; }) => artist.name).join(", ");
    if (artists.length > 10) {
        artists = artists.slice(0, 10) + "...";
    }
    return (
        <div className="flex flex-row w-full gap-3">
            <Image src={nowPlaying.item.album.images[0].url} alt={nowPlaying.item.name} width={100} height={100} />
            <div className="flex flex-col grow">
                <div>
                    <h3 className="text-md">Spotify - Now Playing</h3>
                    <h2 className="text-xl">{nowPlaying.item.name}</h2>
                    <h4 className="text-sm">{artists}</h4>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                    <div
                        className={`bg-blue-600 h-1.5 rounded-full dark:bg-blue-500`}
                        style={{ width: `${(nowPlaying.progress_ms / nowPlaying.item.duration_ms) * 100}%` }}
                    />
                </div>
            </div>
        </div >
    );
};
