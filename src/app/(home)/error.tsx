//@ts-nocheck
"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-full bg-gray-bg flex items-center justify-center text-white font-bold ">
      <div className="flex flex-col gap-6">
        <span className="text-8xl text-white">Something went wrong !</span>
        <button
          onClick={() => {
            reset();
          }}
          className="p-3 bg-spotifyGreen w-48 self-center hover:bg-opacity-80 rounded-full "
        >
          RefreshPage
        </button>
      </div>
    </div>
  );
}
