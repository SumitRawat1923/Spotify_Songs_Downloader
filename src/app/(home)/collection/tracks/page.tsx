//@ts-nocheck
import Clock from "@/Icons/Clock";
import Download from "@/components/client/Download";
import Heart from "@/Icons/Heart";
import { converter, fetchUserTopTracks } from "@/Utils";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";
export const metadata: Metadata = {
  title: "Liked Songs",
  description: "Spotify Application",
};

async function page() {
  const {
    accessToken,
    user: { name },
  } = await getServerSession(authOptions);
  const { total, items: tracks } = await fetchUserTopTracks(accessToken);

  return (
    <>
      <div className="absolute  w-full h-[80%] bg-gradient-to-b  from-gray-300 to-gray-700 top-0 left-0  "></div>
      <div className="p-6 flex justify-start gap-6 mt-6 w-full relative z-20">
        <span className="w-[300px] p-3 aspect-square  bg-gradient-to-br  from-blue-600 via-violet-400 to-white drop-shadow-xl">
          <Heart />
        </span>
        <div className="flex h-[300px] font-bold gap-6 justify-end flex-col text-2xl text-white capitalize">
          <span>playlist</span>
          <span className="text-8xl">Liked Songs</span>

          <span>
            {name} &#8226; {total} Songs
          </span>
        </div>
      </div>
      <div className="w-full backdrop-blur-md p-6 ">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-center text-gray-text">
            <thead className="text-xs capitalize bg-transparent">
              <tr className="border-b-2 border-gray-text text-lg">
                <th scope="col" className="px-1 py-3">
                  #
                </th>
                <th scope="col" className="px-3 text-left py-3 ">
                  Title
                </th>

                <th scope="col" className="px-6 flex justify-center py-3">
                  <Clock />
                </th>
                <th scope="col" className="px-6  py-3">
                  Download
                </th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track, index) => {
                return (
                  <tr
                    key={track.track.id}
                    className="text-lg hover:bg-black hover:bg-opacity-25 rounded-lg "
                  >
                    <td className="px-1 py-2 text-xl ">{index + 1}</td>
                    <td
                      scope="row"
                      className="px-3 py-4 font-medium capitalize  flex gap-2 items-center w-full whitespace-nowrap text-white"
                    >
                      <img
                        src={track.track.album.images[0]?.url}
                        className="h-12 rounded-lg aspect-square"
                      />
                      <div className="text-left">
                        <span>{track.track.name}</span>
                        <br />
                        <span className="text-gray-text">
                          {track.track.artists[0].name}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-4 ">
                      {converter(track.track.duration_ms)}
                    </td>
                    <td className="px-2 h-full py-4 ">
                      <span className="hover:bg-green-600 flex items-center justify-center bg-opacity-70 bg-spotifyGreen p-5">
                        <Download data={track.track} />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default page;
