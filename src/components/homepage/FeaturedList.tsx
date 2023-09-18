//@ts-nocheck
import React from "react";
import ListItem from "../client/ListItem";

async function FeaturedList({ accessToken }) {
  const {
    playlists: { items: featuredList },
  } = await FetchFeatured(accessToken);
  return (
    <>
      <h1 className="px-6 heading">Featured </h1>
      <div className="px-6 grid grid-cols-5 gap-6">
        {featuredList.map((item) => {
          return <ListItem key={item.id} type={item.type} data={item} />;
        })}
      </div>
    </>
  );
}

export default FeaturedList;

async function FetchFeatured(accessToken) {
  const response = await fetch(
    "https://api.spotify.com/v1/browse/featured-playlists?country=IN&limit=10",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) return [];

  return response.json();
}
