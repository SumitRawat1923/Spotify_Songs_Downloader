//@ts-nocheck
"use client";
import Download from "@/components/client/Download";
import { useRouter } from "next/navigation";
import React from "react";

function ListItem({ type, data }) {
  const url =
    (type !== "track" ? data.images[0]?.url : data.album.images[0]?.url) ?? "";

  const router = useRouter();
  return (
    url && (
      <div
        onClick={() => {
          type !== "track" && router.push(`/collection/${type}/${data.id}?`);
        }}
        key={data.id}
        className="rounded-lg bg-white bg-opacity-20 hover:bg-opacity-40 p-4 flex flex-col "
      >
        <div className="w-full relative">
          <img
            src={url}
            className={`w-full aspect-square object-cover  ${
              type === "artist" ? "rounded-full " : "rounded-lg"
            }`}
          />
          {type == "track" && (
            <span className="rounded-full drop-shadow-lg w-16 flex items-center justify-center aspect-square absolute bg-spotifyGreen right-2 bottom-2 ">
              <Download data={data} />
            </span>
          )}
        </div>
        <span
          className={`text-lg font-extrabold text-ellipsis overflow-hidden  whitespace-nowrap text-white mt-4 ${
            type === "artist" ? "self-center" : " w-full"
          }`}
        >
          {data?.name}
        </span>
        <span
          className={` text-gray-text ${
            type === "artist" ? "self-center" : ""
          }`}
        >
          {type}
        </span>
      </div>
    )
  );
}

export default ListItem;
