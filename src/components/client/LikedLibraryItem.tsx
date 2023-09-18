//@ts-nocheck
"use client";
import Heart from "@/Icons/Heart";
import { useRouter } from "next/navigation";
import React from "react";

function LibraryItemLiked({ type, total }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/collection/tracks");
      }}
      className="p-2 hover:bg-gray-hover overflow-hidden rounded-lg flex items-center gap-2"
    >
      <span className="h-14 p-2  aspect-square bg-gradient-to-br  from-blue-600 via-violet-400 to-white rounded-md">
        <Heart />
      </span>
      <div className="flex flex-col justify-around">
        <span className="text-white">Liked Songs</span>
        <span className="text-gray-text">
          {type} &#8226; {total} songs
        </span>
      </div>
    </div>
  );
}

export default LibraryItemLiked;
