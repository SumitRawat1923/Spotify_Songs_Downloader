//@ts-nocheck
import React from "react";
import ListItem from "../client/ListItem";

async function FollowedPlaylistsList({ AccessToken }) {
  const { items: userPlaylist } = await FetchPlaylist(AccessToken);

  return (
    <>
      <h1 className="px-6 heading">Your Playlists</h1>
      <div className="px-6 grid grid-cols-5 gap-6">
        {userPlaylist.map((playList) => {
          return (
            <ListItem key={playList.id} type={playList.type} data={playList} />
          );
        })}
      </div>
    </>
  );
}

export default FollowedPlaylistsList;
async function FetchPlaylist(accessToken) {
  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) return { items: [] };
  return response.json();
}
