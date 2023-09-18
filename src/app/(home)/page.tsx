//@ts-nocheck
import FollowedArtistsList from "@/components/homepage/FollowedArtistsList";
import FollowedPlaylistsList from "@/components/homepage/FollowedPlaylistsList";
import FollowedAlbums from "@/components/homepage/FollowedAlbums";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import FeaturedList from "@/components/homepage/FeaturedList";
import Main from "@/components/homepage/Main";

async function page() {
  const session = await getServerSession(authOptions);
  return (
    <Main type={"normal"}>
      <FeaturedList accessToken={session.accessToken} />
      <FollowedPlaylistsList AccessToken={session.accessToken} />
      <FollowedAlbums AccessToken={session.accessToken} />
      <FollowedArtistsList AccessToken={session.accessToken} />
    </Main>
  );
}

export default page;
