/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import qs from "qs";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const authorization_code = process.env.SPOTIFY_AUTHORIZATION_CODE;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
const tokensPath = path.join(process.cwd(), "tmp", "tokens.json");
const nowPlayingPath = path.join(process.cwd(), "tmp", "nowPlaying.json");
if (!fs.existsSync(path.dirname(tokensPath))) {
  fs.mkdirSync(path.dirname(tokensPath), { recursive: true });
}

let access_token: string;
let refresh_token: string;
if (fs.existsSync(tokensPath)) {
  ({ access_token, refresh_token } = JSON.parse(fs.readFileSync(tokensPath, "utf8")));
}

const basic_authorization = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

export async function setSpotifyStatus() {
  let now_playing_temp = null;
  if (fs.existsSync(nowPlayingPath)) {
    now_playing_temp = JSON.parse(fs.readFileSync(nowPlayingPath, "utf8"));
  }
  if (!access_token) {
    await getFirstAccessTokenToSpotify();
  }
  if (now_playing_temp && Date.now() - now_playing_temp.timestamp < 5000) {
    console.log("Return cahce...");
    return now_playing_temp.data;
  }
  const now_playing = await getNowPlaying();

  if (now_playing) {
    if (now_playing.currently_playing_type == "track") {
      console.log("Now playing:", now_playing.item.name);
      return null;
    } else {
      console.log("Now playing:", now_playing.currently_playing_type);
    }
  }
  return now_playing;
}

export async function getFirstAccessTokenToSpotify(code = authorization_code) {
  const headers = { Authorization: "Basic " + basic_authorization };
  const payload = qs.stringify({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirect_uri,
  });

  try {
    const response = await axios.post("https://accounts.spotify.com/api/token", payload, {
      headers,
    });
    const data = response.data;
    access_token = data.access_token;
    refresh_token = data.refresh_token;
    console.log("Access token:", access_token);
    console.log("Refresh token:", refresh_token);
    const tokens = JSON.stringify(
      {
        access_token: access_token,
        refresh_token: refresh_token,
      },
      null,
      " "
    );
    fs.writeFileSync(tokensPath, tokens);
    console.log("Tokens saved to:", tokensPath);
  } catch (error) {
    console.error(
      "Error getting access token:",
      (error as any).response?.data || (error as any).message
    );
  }
}

async function refreshAccessTokenToSpotify() {
  const headers = {
    Authorization: "Basic " + basic_authorization,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const payload = qs.stringify({
    grant_type: "refresh_token",
    refresh_token: refresh_token,
  });

  try {
    const response = await axios.post("https://accounts.spotify.com/api/token", payload, {
      headers,
    });
    const data = response.data;
    access_token = data.access_token;
    if (data.refresh_token) {
      refresh_token = data.refresh_token;
    }
    const tokens = JSON.stringify(
      {
        access_token: access_token,
        refresh_token: refresh_token,
      },
      null,
      " "
    );
    fs.writeFileSync(tokensPath, tokens);
  } catch (error) {
    const err = error as any;
    console.error("Error refreshing access token:", err.response?.data || err.message);
    return 1;
  }
}

async function getNowPlaying() {
  const headers = { Authorization: `Bearer ${access_token}` };

  try {
    const response = await axios.get("https://api.spotify.com/v1/me/player", {
      headers,
    });

    if (response.status === 200) {
      const json = JSON.stringify({ data: response.data, timestamp: Date.now() }, null, " ");
      if (response.data.device.is_private_session) {
        console.log("Private session, return null.");
        return null;
      }
      fs.writeFileSync(nowPlayingPath, json);
      return response.data;
    } else if (response.status === 204) {
      return null;
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      if ((await refreshAccessTokenToSpotify()) == 1) return null;
      return await getNowPlaying();
    } else {
      const err = error as any;
      console.error("Error getting now playing:", err.response?.data || err.message);
    }
  }
}
