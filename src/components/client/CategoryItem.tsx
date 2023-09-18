//@ts-nocheck
"use client";
import { useRouter } from "next/navigation";
import React from "react";

function CategoryItem({ data }) {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/genre/${data.id}?name=${encodeURIComponent(data.name)}`);
      }}
      className={`w-full px-4 py-6 hover:bg-opacity-60 aspect-square rounded-lg overflow-hidden relative bg-gradient-to-br from-gray-300 to-gray-700 `}
    >
      <span className="text-white font-bold text-2xl">{data.name}</span>
      <img
        src={data.icons[0].url}
        className={`rounded-xl absolute -rotate-[24deg] aspect-square w-3/4 transform translate-x-1/3 translate-y-1/3 `}
      ></img>
    </div>
  );
}

export default CategoryItem;
