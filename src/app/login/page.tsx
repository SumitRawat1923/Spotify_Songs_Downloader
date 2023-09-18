//@ts-nocheck
"use client";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <div className="w-full  h-screen text-center bg-black flex items-center justify-center">
      <div>
        <img
          src="/SpotifyLogo.png"
          alt="Spotify Logo"
          className="w-[200px] md:w-[500px]"
        />
        <button
          className=" mt-4 p-2  md:px-3 md:py-2 rounded-3xl font-bold w-40 text-white text-xl bg-spotifyGreen"
          onClick={() => {
            signIn("spotify");
          }}
        >
          LOGIN
        </button>

      </div>
    </div>
  );
}
