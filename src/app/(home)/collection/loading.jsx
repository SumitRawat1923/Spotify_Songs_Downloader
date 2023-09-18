//@ts-nocheck
import React from "react";
import Skeleton from "react-loading-skeleton";

function Loading() {
  return (
    <>
      <div className="absolute  w-full h-[80%] bg-gradient-to-b from-gray-300 to-gray-700 top-0 left-0  "></div>
      <div className="p-6 flex justify-start gap-6 mt-6 w-full relative z-20">
        <span className="w-[300px]  aspect-square   drop-shadow-xl">
          <Skeleton height={"100%"} />
        </span>
        <div className="flex h-[300px] font-bold gap-6 justify-end flex-col text-2xl text-white capitalize">
          <span className="w-52">
            <Skeleton />
          </span>
          <span className="text-8xl w-[700px]">
            <Skeleton />
          </span>

          <span className="w-52">
            <Skeleton />
          </span>
        </div>
      </div>
      <div className="w-full backdrop-blur-md p-6 ">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-center text-gray-text">
            <thead className="text-xs capitalize bg-transparent">
              <tr className="border-b-2 border-gray-text text-lg">
                <th scope="col" className="px-1 w-1/12 py-3">
                  #
                </th>
                <th
                  scope="col"
                  className="px-3 flex-grow w-7/12 text-left py-3 "
                >
                  Title
                </th>

                <th scope="col" className="px-6  w-2/12  py-3">
                  Duration
                </th>
                <th scope="col" className="px-6 w-2/12  py-3">
                  Download
                </th>
              </tr>
            </thead>
          </table>
          <Skeleton height={"60px"} className="mt-4" count={15} />
        </div>
      </div>
    </>
  );
}

export default Loading;
