//@ts-nocheck
import React from "react";
import Skeleton from "react-loading-skeleton";

function LoadingBox(index, type) {
  return (
    <div
      key={index}
      className="rounded-lg bg-white bg-opacity-20 hover:bg-opacity-40 p-4 full flex flex-col "
    >
      <span
        className={`w-full aspect-square object-cover overflow-hidden  ${
          type === "artist" ? "rounded-full " : "rounded-lg"
        }`}
      >
        <Skeleton height={"100%"} />
      </span>
      <span className={`text-3xl  mt-4 w-full`}>
        <Skeleton />
      </span>
      <span className={`text-2xl`}>
        <Skeleton />
      </span>
    </div>
  );
}

export default LoadingBox;
