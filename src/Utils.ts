//@ts-nocheck
export function converter(ms) {
  var min = Math.floor((ms / 1000 / 60) << 0);
  var sec = Math.floor((ms / 1000) % 60);
  if (sec - 9 <= 0) {
    sec = "0" + sec;
  }

  return min + " : " + sec;
}

export async function fetchData(accessToken, id, type) {
  const ALBUM_URL = "https://api.spotify.com/v1/albums/";
  const PLAYLIST_URL = "https://api.spotify.com/v1/playlists/";
  const ARTIST_URL = "https://api.spotify.com/v1/artists/";
  const FETCH_URL =
    type === "artist"
      ? ARTIST_URL
      : type === "album"
      ? ALBUM_URL
      : PLAYLIST_URL;
  const response = await fetch(FETCH_URL + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  console.log(response.statusText + ":" + type);
  if (!response.ok) return null;
  return response.json();
}
export async function FetchArtistTopTracks(accessToken, id) {
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${id}/top-tracks?market=IN`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response.statusText + " : ArtistTable ");
  if (!response.ok) return null;
  return response.json();
}

export async function fetchUserTopTracks(accessToken) {
  var trackList = [];
  var url = "https://api.spotify.com/v1/me/tracks?limit=50";
  var response;
  do {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) return { total: 0, items: trackList };
    const Json = await response.json();
    url = Json.next;
    trackList = [...trackList, ...Json.items];
  } while (url);

  return { total: trackList.length, items: trackList };
}

export async function FetchLikedSongs(accessToken) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/tracks?" +
      new URLSearchParams({
        limit: "1",
      }),
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response.statusText + "");
  if (!response.ok) return { artists: { items: [] } };
  return response.json();
}

export async function fetchFollowedData(accessToken) {
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  };
  const playlists = fetch("https://api.spotify.com/v1/me/playlists", options);
  const artists = fetch(
    "https://api.spotify.com/v1/me/following?" +
      new URLSearchParams({
        type: "artist",
      }),
    options
  );
  const albums = fetch("https://api.spotify.com/v1/me/albums", options);
  const Response = await Promise.all([playlists, artists, albums]);
  if (!Response[0].ok || !Response[1].ok || !Response[2].ok) {
    console.log("Library fetch error");
    return [];
  }
  const Json = await Promise.all([
    Response[0].json(),
    Response[1].json(),
    Response[2].json(),
  ]);
  return [...Json[0].items, ...Json[1].artists.items, ...Json[2].items];
}
