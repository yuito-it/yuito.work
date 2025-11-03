/* eslint-disable @typescript-eslint/no-explicit-any */
import qs from "qs";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const authorization_code = process.env.SPOTIFY_AUTHORIZATION_CODE;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
const tokensPath = path.join(process.cwd(), "tmp", "tokens.json");

if (!fs.existsSync(path.dirname(tokensPath))) {
  fs.mkdirSync(path.dirname(tokensPath), { recursive: true });
}

let access_token: string;
let refresh_token: string;

function loadTokens() {
  try {
    if (fs.existsSync(tokensPath)) {
      const content = fs.readFileSync(tokensPath, "utf8");
      if (content.trim()) {
        const tokens = JSON.parse(content);
        access_token = tokens.access_token;
        refresh_token = tokens.refresh_token;
      }
    }
  } catch (error) {
    console.error("Error loading tokens:", error);
  }
}

const basic_authorization = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

export async function setSpotifyStatus() {
  loadTokens();
  if (!access_token) {
    await getFirstAccessTokenToSpotify();
  }
  const now_playing = await getNowPlaying();

  if (now_playing) {
    if (now_playing.currently_playing_type == "track") {
      console.log("Now playing:", now_playing.item.name);
    } else {
      console.log("Now playing:", now_playing.currently_playing_type);
    }
  }
  return now_playing;
}

export async function getFirstAccessTokenToSpotify(code = authorization_code) {
  loadTokens();
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      next: { revalidate: 30 },
      method: "POST",
      headers: {
        Authorization: "Basic " + basic_authorization,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: qs.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
      }),
    });

    if (!response.ok) throw new Error("HTTP status " + response.status);

    const data = await response.json();
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
    console.error("Error getting access token:", error);
  }
}

async function refreshAccessTokenToSpotify() {
  loadTokens();
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      next: { revalidate: 30 },
      method: "POST",
      headers: {
        Authorization: "Basic " + basic_authorization,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: qs.stringify({
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      }),
    });

    if (!response.ok) throw new Error("HTTP status " + response.status);

    const data = await response.json();
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
    console.error("Error refreshing access token:", error);
    return 1;
  }
}

async function getNowPlaying() {
  loadTokens();
  try {
    const response = await fetch("https://api.spotify.com/v1/me/player", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 204) {
      return null;
    }

    if (!response.ok) {
      if (response.status === 401) {
        if ((await refreshAccessTokenToSpotify()) == 1) return null;
        return await getNowPlaying();
      }
      throw new Error("HTTP status " + response.status);
    }

    const data = await response.json();
    if (data.device.is_private_session) {
      console.log("Private session, return null.");
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error getting now playing:", error);
    return null;
  }
}
