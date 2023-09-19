//@ts-nocheck
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ListItem from "@/components/client/ListItem";
import Main from "@/components/homepage/Main";
import { getServerSession } from "next-auth";
import React from "react";

async function page({ params: { id }, searchParams: { name } }) {
  const { accessToken } = await getServerSession(authOptions);
  const {
    playlists: { items },
  } = await CategoryFetcher(accessToken, id);

  return (
    <>
      <div className="absolute  w-full h-[80%] bg-gradient-to-b from-gray-300 to-gray-700 top-0 left-0  "></div>
      <div className="p-6 flex justify-start gap-6 mt-6 w-full relative z-20">
        <div className="flex h-[100px] font-bold gap-6 justify-end flex-col text-2xl text-white capitalize">
          <span className="text-9xl">{name}</span>
        </div>
      </div>
      <div className="w-full backdrop-blur-md p-6">
        <div className="relative overflow-x-auto">
          <div className="px-6 grid grid-cols-5 gap-6">
            {items.map((playList) => {
             if (playList)
             {return (
                  <ListItem
                    key={playList.id}
                    type={playList.type}
                    data={playList}
                  />
                )}
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default page;

async function CategoryFetcher(accessToken, id) {
  const Response = await fetch(
    `https://api.spotify.com/v1/browse/categories/${id}/playlists?country=IN`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  );

  if (!Response.ok) return { playlists: { name: "", items: [] } };
  return Response.json();
}
