//@ts-nocheck
import Main from "@/components/homepage/Main";
import React from "react";

function layout({ children }) {
  return <Main type={"search"}>{children}</Main>;
}

export default layout;
