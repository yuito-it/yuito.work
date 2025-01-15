import { setSpotifyStatus } from "@/lib/spotify";
import Image from 'next/image';
import { FaSpotify, FaPodcast } from "react-icons/fa6";

export const dynamic = 'force-dynamic';

async function NowPlayingWidget() {
    const nowPlaying = await setSpotifyStatus();

    if (!nowPlaying) return;
    if (nowPlaying.currently_playing_type == "ad") return;
    
    if (nowPlaying.currently_playing_type == "episode") {
        return (
            <div className="flex flex-row w-full gap-3 max-h-100 items-center justify-center">
                <FaPodcast size={100} className="max-h-full" />
                <div className="flex flex-col grow max-h-100">
                    <div>
                        <h3 className="md:text-md text-sm flex flex-row items-center gap-1"><FaSpotify/>Spotify - Now Playing</h3>
                        <h2 className="md:text-xl">{"Podcast"}</h2>
                    </div>
                </div>
            </div>
        );
    }

    let artists = nowPlaying.item.artists.map((artist: { name: string; }) => artist.name).join(", ");
    if (artists.length > 10) {
        artists = artists.slice(0, 10) + "...";
    }

    return (
        <div className="flex flex-row w-full gap-3 max-h-100 items-center justify-center">
            <Image src={nowPlaying.item.album.images[0].url} alt={nowPlaying.item.name} unoptimized width={100} height={100} className="max-h-full"/>
            <div className="flex flex-col grow max-h-100">
                <div>
                    <h3 className="md:text-md text-sm flex flex-row items-center gap-1"><FaSpotify/>Spotify - Now Playing</h3>
                    <h2 className="md:text-xl">{nowPlaying.item.name}</h2>
                    <h4 className="text-sm">{artists}</h4>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                    <div
                        className={`bg-blue-600 h-1.5 rounded-full dark:bg-blue-500`}
                        style={{ width: `${(nowPlaying.progress_ms / nowPlaying.item.duration_ms) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

export default NowPlayingWidget;