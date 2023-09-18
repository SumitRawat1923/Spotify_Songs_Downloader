//@ts-nocheck
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";
import CategoryItem from "@/components/client/CategoryItem";
export const metadata: Metadata = {
  title: "Search",
  description: "Spotify Application",
};

async function page() {
  const session = await getServerSession(authOptions);
  const {
    categories: { items: CategoryList },
  } = await CategoryFetcher(session.accessToken);

  return (
    <>
      <div className="p-6">
        <h1 className="heading">Browse all</h1>
        <div className="grid gap-6 grid-cols-5">
          {CategoryList.map((e) => {
            return <CategoryItem key={e.id} data={e} />;
          })}
        </div>
      </div>
    </>
  );
}
export default page;

async function CategoryFetcher(accessToken) {
  const response = await fetch(
    "https://api.spotify.com/v1/browse/categories?country=IN",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) return { categories: { items: [] } };
  return response.json();
}
