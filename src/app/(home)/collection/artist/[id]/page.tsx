//@ts-nocheck
import Clock from "@/Icons/Clock";
import Download from "@/components/client/Download";
import { FetchArtistTopTracks, converter, fetchData } from "@/Utils";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Main from "@/components/homepage/Main";
import { getServerSession } from "next-auth";
import React from "react";
export const metadata: Metadata = {
  title: "Artist",
  description: "Spotify Application",
};

async function page({ params: { id } }) {
  const { accessToken } = await getServerSession(authOptions);
  const Response = await fetchData(accessToken, id, "artist");
  const { tracks } = await FetchArtistTopTracks(accessToken, id);
  return (
    <>
      <div className="absolute  w-full h-[80%] bg-gradient-to-b from-gray-300 to-gray-700 top-0 left-0  "></div>
      <div className="p-6 flex justify-start gap-6 mt-6 w-full relative z-20">
        <img
          src={Response?.images[0].url}
          className={`aspect-square w-[300px] drop-shadow-xl bg-white rounded-full `}
        />
        <div className="flex h-[300px] font-bold gap-6 justify-end flex-col text-2xl text-white capitalize">
          <span>{Response?.type}</span>
          <span className="text-8xl">{Response?.name}</span>
        </div>
      </div>
      <div className="w-full backdrop-blur-md p-6">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-text">
            <thead className="text-xs capitalize bg-transparent">
              <tr className="border-b-2 border-gray-text text-lg">
                <th scope="col" className="px-1  text-center py-3">
                  #
                </th>
                <th scope="col" className="px-3 py-3 ">
                  Title
                </th>

                <th scope="col" className="px-6 flex justify-center py-3">
                  <Clock />
                </th>
                <th scope="col" className="px-6 text-center py-3">
                  Download
                </th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track, index) => {
                return (
                  <tr
                    key={track.id}
                    className="text-lg hover:bg-black hover:bg-opacity-25"
                  >
                    <td className="px-1 py-2 text-center  text-xl">
                      {index + 1}
                    </td>
                    <td
                      scope="row"
                      className="px-3 py-4 font-medium  w-full whitespace-nowrap flex gap-2 items-center text-white"
                    >
                      <img
                        src={track.album.images[0]?.url}
                        className="h-12 rounded-lg aspect-square"
                        alt="Image"
                      />
                      <div>
                        <span>{track.name}</span>
                        <br />
                        <span className="text-gray-text">
                          {track.artists[0].name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      {converter(track.duration_ms)}
                    </td>
                    <td className="px-2 py-4 text-center">
                      <span className="hover:bg-green-600 flex items-center justify-center bg-opacity-70 bg-spotifyGreen p-5">
                        <Download data={track} />
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
