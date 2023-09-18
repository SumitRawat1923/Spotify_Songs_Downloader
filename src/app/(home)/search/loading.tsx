import React from "react";
import Skeleton from "react-loading-skeleton";

function Loading() {
  return (
    <div className="p-6">
      <h1 className="heading">Browse All</h1>
      <div className="grid gap-6 grid-cols-5">
        {[...Array(18)].map((e, i) => (
          <Skeleton key={i} inline={true} className="w-full aspect-square " />
        ))}
      </div>
    </div>
  );
}

export default Loading;
