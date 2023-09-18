//@ts-nocheck
import Image from "next/image";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FetchLikedSongs, fetchFollowedData } from "@/Utils";
import LibraryItemLiked from "../client/LikedLibraryItem";
import LibraryItem from "../client/LibraryItem";

async function Library() {
  const { accessToken } = await getServerSession(authOptions);
  const { items: likedSongs, total } = await FetchLikedSongs(accessToken);
  const libraryList = await fetchFollowedData(accessToken);

  return (
    <div className="h-full relative bg-gray-bg rounded-lg overflow-hidden">
      <div className="sticky px-3 py-2 top-0 drop-shadow-lg shadow-black">
        <button className="text-white flex  p-3 gap-3 items-center">
          <Image src="/CollectionImage.png" alt="Icon" width={30} height={30} />
          <span className="text-xl">Your Library</span>
        </button>
      </div>
      <div className="px-2 pt-2 pb-20 overflow-y-auto w-full h-full ">
        <LibraryItemLiked total={total} data={likedSongs} type={"liked"} />
        {libraryList.map((item) => {
          if (item.type) {
            return (
              <LibraryItem
                key={item.id + "library"}
                id={item.id}
                type={item.type}
                name={item.name}
                url={item.images[0].url}
              />
            );
          } else {
            return (
              <LibraryItem
                key={item.album.id + "library"}
                id={item.album.id}
                type={item.album.type}
                name={item.album.name}
                url={item.album.images[0].url}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default Library;
