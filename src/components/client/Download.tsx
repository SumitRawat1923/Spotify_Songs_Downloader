//@ts-nocheck
"use client";
import React, { useState } from "react";
import { SyncLoader } from "react-spinners";

function Download({ data }) {
  const [loading, setLoading] = useState(false);
  const Download = async () => {
    setLoading(true);
    const Song = data.name ?? "Never Gonna Give You Up";
    const Artist = data.artists[0].name ?? "Rick Astley";
    const query = Song + "-" + Artist;

    try {
      const Result = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/download-link?q=${query}`
      );
      if (!Result.ok) {
        setLoading(false);
        return;
      }
      const Json = await Result.json();

      const aTag = document.createElement("a");
      aTag.href = Json.link;
      aTag.setAttribute("download", Json.title);
      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };
  return (
    <button disabled={loading} onClick={Download}>
      {loading ? (
        <SyncLoader color="white" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      )}
    </button>
  );
}

export default Download;
