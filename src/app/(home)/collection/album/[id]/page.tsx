//@ts-nocheck
import Clock from "@/Icons/Clock";
import Download from "@/components/client/Download";
import { converter, fetchData } from "@/Utils";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Main from "@/components/homepage/Main";
import { getServerSession } from "next-auth";
export const metadata: Metadata = {
  title: "Album",
  description: "Spotify Application",
};

async function page({ params: { id } }) {
  const { accessToken } = await getServerSession(authOptions);
  const Response = await fetchData(accessToken, id, "album");
  const tracks = Response?.tracks.items ?? [];
  return (
    <>
      <div className="absolute  w-full h-[80%] bg-gradient-to-b from-gray-300 to-gray-700 top-0 left-0  "></div>
      <div className="p-6 flex justify-start gap-6 mt-6 w-full relative z-20">
        <img
          src={Response?.images[0].url}
          className={`aspect-square w-[300px] drop-shadow-xl bg-white`}
        />
        <div className="flex h-[300px] font-bold gap-6 justify-end flex-col text-2xl text-white capitalize">
          <span>{Response?.type}</span>
          <span className="text-8xl">{Response?.name}</span>
          <span>
            {Response?.artists[0].name} &#8226; {Response?.tracks.total} Songs
          </span>
        </div>
      </div>
      <div className="w-full backdrop-blur-md p-6">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-text">
            <thead className="text-xs capitalize bg-transparent">
              <tr className="border-b-2 border-gray-text text-lg">
                <th scope="col" className="px-1 py-3">
                  #
                </th>
                <th scope="col" className="px-3 py-3 ">
                  Title
                </th>

                <th scope="col" className="px-6 py-3">
                  <Clock />
                </th>
                <th scope="col" className="px-6 py-3">
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
                    <td className="px-1 py-2 text-xl">{index + 1}</td>
                    <td
                      scope="row"
                      className="px-3 py-4 font-medium  w-full whitespace-nowrap  text-white"
                    >
                      <span>{track.name}</span>
                      <br />
                      <span className="text-gray-text">
                        {track.artists[0].name}
                      </span>
                    </td>
                    <td className="px-2 py-4">
                      {converter(track.duration_ms)}
                    </td>
                    <td className="px-2 h-full py-4 ">
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
