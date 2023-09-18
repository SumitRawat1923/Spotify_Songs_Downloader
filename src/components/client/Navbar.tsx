//@ts-nocheck
"use client";
import Left from "@/Icons/Left";
import Right from "@/Icons/Right";
import Search from "@/Icons/Search";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Navbar({ type, info }) {
  const [query, setQuery] = useState(info ?? "");
  const { status } = useSession();
  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    const query = e.target[1].value;
    const route = info ? `search/${query}` : `/search/${query}`;
    query && router.push(route);
  };
  return (
    <div className="px-6 sticky top-0  py-4 w-full flex items-center justify-between backdrop-blur-sm z-50 ">
      <div className="flex items-center gap-3 w-1/2">
        <div className="flex gap-3">
          <button
            onClick={() => {
              router.back();
            }}
            className="btn-circle"
          >
            <Left />
          </button>
          <button
            onClick={() => {
              router.forward();
            }}
            className="btn-circle"
          >
            <Right />
          </button>
        </div>
        {type === "search" && (
          <form
            onSubmit={submitHandler}
            className="border-2 border-white bg-gray-hover rounded-full  p-3 gap-2 flex w-full items-center"
          >
            <button
              type="submit"
              className=" rounded-full  w-[30px] h-[30px] text-white"
            >
              <Search />
            </button>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              type="text"
              placeholder="Search Here"
              className="outline-none text-gray-text bg-inherit h-10 w-full"
            />
          </form>
        )}
      </div>
      <button
        disabled={status === "loading" ? true : false}
        onClick={() => {
          if (status == "authenticated") signOut();
          else {
            signIn("spotify");
          }
        }}
        className={` rounded-full py-3 w-44 text-white  bg-spotifyGreen hover:opacity-80 font-bold text-lg `}
      >
        {status === "authenticated" ? "Logout" : "Login"}
      </button>
    </div>
  );
}

export default Navbar;
