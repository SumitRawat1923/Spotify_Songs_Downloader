//@ts-nocheck
import React from "react";
import ListItem from "../client/ListItem";

async function FollowedAlbums({ AccessToken }) {
  const { items: albumList } = await FetchAlbums(AccessToken);
  return (
    <>
      <h1 className="px-6 heading">Followed Albums</h1>
      <div className="px-6 grid grid-cols-5 gap-6">
        {albumList.map((album) => {
          return (
            <ListItem
              key={album.id}
              type={album.album.type}
              data={album.album}
            />
          );
        })}
      </div>
    </>
  );
}

export default FollowedAlbums;
async function FetchAlbums(accessToken) {
  const response = await fetch("https://api.spotify.com/v1/me/albums", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) return { items: [] };
  return response.json();
}
