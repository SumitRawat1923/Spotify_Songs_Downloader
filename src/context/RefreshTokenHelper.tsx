//@ts-nocheck
"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

function RefreshTokenHelper() {
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn("spotify");
    }
  }, [session]);
  return null;
}

export default RefreshTokenHelper;
