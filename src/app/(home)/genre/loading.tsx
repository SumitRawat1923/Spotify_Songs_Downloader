//@ts-nocheck
import LoadingBox from "@/components/loading/LoadingBox";
import React from "react";
import Skeleton from "react-loading-skeleton";

function loading() {
  return (
    <>
      <div className="absolute  w-full h-[80%] bg-gradient-to-b from-gray-300 to-gray-700 top-0 left-0  "></div>
      <div className="p-6 flex justify-start gap-6 mt-6 w-full relative z-20">
        <div className="flex h-[150px] font-bold gap-6 w-full justify-end flex-col ">
          <span className="text-9xl p-6 w-1/2">
            <Skeleton />
          </span>
        </div>
      </div>
      <div className="w-full backdrop-blur-md p-6">
        <div className="relative overflow-x-auto">
          <div className="px-6 grid grid-cols-5 gap-6">
            {[...Array(18)].map((e, i) => (
              <>
                <LoadingBox index={i} type={"track"} />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default loading;
