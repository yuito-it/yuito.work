import axios from "axios";
import qs from "qs";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const authorization_code = process.env.SPOTIFY_AUTHORIZATION_CODE;
const redirect_uri = "http://localhost:3000";
const tokensPath = path.join(process.cwd(), "src", "lib", "tokens.json");
const nowPlayingPath = path.join(
  process.cwd(),
  "src",
  "lib",
  "nowPlaying.json"
);

let { access_token, refresh_token } = JSON.parse(
  fs.readFileSync(tokensPath, "utf8")
);

const basic_authorization = Buffer.from(
  `${client_id}:${client_secret}`
).toString("base64");

export async function setSpotifyStatus() {
  let now_playing_temp = JSON.parse(fs.readFileSync(nowPlayingPath, "utf8"));
  if (!access_token) {
    await getFirstAccessTokenToSpotify();
  }
  if (Date.now() - now_playing_temp.timestamp < 5000) {
    console.log("Return cahce...");
    return now_playing_temp.data;
  }
  const now_playing = await getNowPlaying();

  if (now_playing) {
    console.log("Now playing:", now_playing.item.name);
  } else {
    console.log("Not playing anything.");
  }
  return now_playing;
}

async function getFirstAccessTokenToSpotify() {
  const headers = { Authorization: "Basic " + basic_authorization };
  const payload = qs.stringify({
    grant_type: "authorization_code",
    code: authorization_code,
    redirect_uri: redirect_uri,
  });

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      payload,
      { headers }
    );
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
  } catch (error) {
    console.error(
      "Error getting access token:",
      error.response?.data || error.message
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
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      payload,
      { headers }
    );
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
    console.error(
      "Error refreshing access token:",
      error.response?.data || error.message
    );
  }
}

async function getNowPlaying() {
  const headers = { Authorization: `Bearer ${access_token}` };

  try {
    const response = await axios.get("https://api.spotify.com/v1/me/player", {
      headers,
    });

    if (response.status === 200) {
      const json = JSON.stringify(
        { data: response.data, timestamp: Date.now() },
        null,
        " "
      );
      fs.writeFileSync(
        path.join(process.cwd(), "src", "lib", "nowPlaying.json"),
        json
      );
      return response.data;
    } else if (response.status === 204) {
      return null;
    }
  } catch (error) {
    if (error.response?.status === 401) {
      await refreshAccessTokenToSpotify();
      return await getNowPlaying();
    } else {
      console.error(
        "Error getting now playing:",
        error.response?.data || error.message
      );
    }
  }
}

export async function getAlbamArtwork(id) {
  const headers = { Authorization: `Bearer ${access_token}` };
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${id}`,
      {
        headers,
      }
    );

    if (response.status === 200) {
      return response.data.images[0];
    } else if (response.status === 204) {
      return null;
    }
  } catch (error) {
    if (error.response?.status === 401) {
      await refreshAccessTokenToSpotify();
      return await getNowPlaying();
    } else {
      console.error(
        "Error getting now playing:",
        error.response?.data || error.message
      );
    }
  }
}
