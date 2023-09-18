//@ts-nocheck
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ListItem from "@/components/client/ListItem";
import { getServerSession } from "next-auth";
import React from "react";

async function page({ params: { query } }) {
  const { accessToken } = await getServerSession(authOptions);
  const {
    artists: { items: artistList },
    playlists: { items: playlists },
    tracks: { items: trackList },
    albums: { items: albumList },
  } = await fetchQuery(accessToken, query);

  return (
    <>
      {trackList.length && (
        <>
          <h1 className="px-6 heading">Tracks</h1>
          <div className="px-6 grid grid-cols-5 gap-6">
            {trackList.map((track) => {
              return <ListItem key={track.id} type={track.type} data={track} />;
            })}
          </div>
        </>
      )}
      {playlists.length && (
        <>
          <h1 className="px-6 heading">Playlists</h1>
          <div className="px-6 grid grid-cols-5 gap-6">
            {playlists.map((playlist) => {
              return (
                <ListItem
                  key={playlist.id}
                  type={playlist.type}
                  data={playlist}
                />
              );
            })}
          </div>
        </>
      )}
      {albumList.length && (
        <>
          <h1 className="px-6 heading">Albums</h1>
          <div className="px-6 grid grid-cols-5 gap-6">
            {albumList.map((album) => {
              return <ListItem key={album.id} type={album.type} data={album} />;
            })}
          </div>
        </>
      )}

      {artistList.length && (
        <>
          <h1 className="px-6 heading">Artists</h1>
          <div className="px-6 grid grid-cols-5 gap-6">
            {artistList.map((artist) => {
              return (
                <ListItem key={artist.id} type={artist.type} data={artist} />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default page;

async function fetchQuery(accessToken, query) {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=album%2Ctrack%2Cplaylist%2Cartist&limit=5`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) return { items: [] };
  return response.json();
}
