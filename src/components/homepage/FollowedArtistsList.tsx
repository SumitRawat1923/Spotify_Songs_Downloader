//@ts-nocheck
import React from "react";
import ListItem from "../client/ListItem";

async function FollowedArtistsList({ AccessToken }) {
  const {
    artists: { items: artistList },
  } = await FetchArtists(AccessToken);

  return (
    <>
      <h1 className="px-6 heading">Followed Artists</h1>
      <div className="px-6 grid grid-cols-5 gap-6">
        {artistList.map((artist) => {
          return <ListItem key={artist.id} type={artist.type} data={artist} />;
        })}
      </div>
    </>
  );
}

export default FollowedArtistsList;

async function FetchArtists(accessToken) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/following?" +
      new URLSearchParams({
        type: "artist",
        limit: "40",
      }),
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) return { artists: { items: [] } };
  return response.json();
}
