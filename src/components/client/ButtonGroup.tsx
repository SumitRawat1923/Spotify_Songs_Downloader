//@ts-check
"use client";
import Home from "@/Icons/Home";
import Search from "@/Icons/Search";
import { useRouter } from "next/navigation";
import React from "react";

function ButtonGroup() {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => {
          router.push("/");
        }}
        className="focus:text-white hover:text-white font-extrabold flex gap-2 items-center"
      >
        <span className=" rounded-full p-3 w-[50px] h-[50px] ">
          <Home />
        </span>
        <span>HOME</span>
      </button>
      <button
        onClick={() => {
          router.push("/search");
        }}
        className="focus:text-white hover:text-white font-extrabold flex gap-2 items-center"
      >
        <span className=" rounded-full p-3 w-[50px] h-[50px]">
          <Search />
        </span>
        <span>SEARCH</span>
      </button>
    </>
  );
}
export default ButtonGroup;
