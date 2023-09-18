//@ts-nocheck
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");
  try {
    const searchOptions = {
      method: "GET",
      url: "https://yt-api.p.rapidapi.com/search",
      params: {
        query,
      },
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.YOUTUBE_SEARCH_HOST,
      },
    };
    const SearchResult = await axios.request(searchOptions);
    var Result = {};
    try {
      const fastDownloadOptions = {
        method: "GET",
        url: "https://youtube-mp36.p.rapidapi.com/dl",
        params: { id: SearchResult.data.data[0].videoId },
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.FAST_MP3_HOST,
        },
      };
      Result = await axios.request(fastDownloadOptions);
    } catch (error) {
      const slowDowloadOptions = {
        method: "GET",
        url: "https://youtube-mp3-downloader2.p.rapidapi.com/ytmp3/ytmp3/",
        params: {
          url: `https://www.youtube.com/watch?v=${SearchResult.data.data[0].videoId}`,
        },
        headers: {
          "X-RapidAPI-Key": process.env.RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.SLOW_MP3_HOST,
        },
      };
      Result = await axios.request(slowDowloadOptions);
    }
    return NextResponse.json(Result.data);
  } catch (e) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
