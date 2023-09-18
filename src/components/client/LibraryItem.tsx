//@ts-nocheck
"use client";
import { useRouter } from "next/navigation";
import React from "react";

function LibraryItem({ type, name, id, total, url }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/collection/${type}/${id}`);
      }}
      className="p-2 hover:bg-gray-hover capitalize overflow-hidden items-end rounded-lg flex gap-2"
    >
      <img
        src={url}
        className={`w-14 aspect-square bg-white  ${type==="artist"?"rounded-full":"rounded-lg"}`}
      ></img>
      <div className="flex flex-col justify-around">
        <span className="text-white">{name}</span>
        <span className="text-gray-text">{type}</span>
      </div>
    </div>
  );
}

export default LibraryItem;
