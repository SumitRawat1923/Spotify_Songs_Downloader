//@ts-nocheck
import LoadingBox from "@/components/loading/LoadingBox";
import React from "react";
import { SkeletonTheme } from "react-loading-skeleton"

function loading() {
  return (
    <>
      <h1 className="px-6 heading">Tracks</h1>
      <div className="px-6 grid grid-cols-5 gap-6">
        {[...Array(5)].map((e, i) => (
          <>
            <LoadingBox index={i} type={"track"} />
          </>
        ))} 
      </div>
      <h1 className="px-6 heading">Playlists</h1>
      <div className="px-6 grid grid-cols-5 gap-6">
        {[...Array(5)].map((e, i) => (
          <>
            <LoadingBox index={i + 100} type={"playlist"} />
          </>
        ))}
      </div>
      <h1 className="px-6 heading">Albums</h1>
      <div className="px-6 grid grid-cols-5 gap-6">
        {[...Array(5)].map((e, i) => (
          <>
            <LoadingBox index={i + 200} type={"album"} />
          </>
        ))}
      </div>
      <h1 className="px-6 heading">Artists</h1>
      <div className="px-6 grid grid-cols-5 gap-6">
        {[...Array(5)].map((e, i) => (
          <>
            <LoadingBox index={i + 300} type={"artist"} />
          </>
        ))}
      </div>
    </>
  );
}

export default loading;
