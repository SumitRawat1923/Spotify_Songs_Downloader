//@ts-nocheck
import LoadingBox from "@/components/loading/LoadingBox";
import React from "react";

function loading() {
  return (
   
      <>
        <h1 className="px-6 heading">Featured </h1>
        <div className="px-6 grid grid-cols-5 gap-6">
          {[...Array(5)].map((e, i) => (
            <>
              <LoadingBox index={i} type={"track"} />
            </>
          ))}
        </div>
        <h1 className="px-6 heading">Your Playlists</h1>
        <div className="px-6 grid grid-cols-5 gap-6">
          {[...Array(5)].map((e, i) => (
            <>
              <LoadingBox index={i + 100} type={"track"} />
            </>
          ))}
        </div>
        <h1 className="px-6 heading">Followed Albums</h1>
        <div className="px-6 grid grid-cols-5 gap-6">
          {[...Array(5)].map((e, i) => (
            <>
              <LoadingBox index={i + 200} type={"track"} />
            </>
          ))}
        </div>
        <h1 className="px-6 heading">Followed Artists </h1>
        <div className="px-6 grid grid-cols-5 gap-6">
          {[...Array(5)].map((e, i) => (
            <>
              <LoadingBox index={i + 300} type={"track"} />
            </>
          ))}
        </div>
      </>

  );
}

export default loading;
