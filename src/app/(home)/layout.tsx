import ButtonGroup from "@/components/client/ButtonGroup";
import Library from "@/components/homepage/Library";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Spotify Collection",
  description: "User's Collection",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <html lang="en">
      <body>
        <div className="bg-black w-full h-screen gap-3 flex p-3">
          <div className="basis-1/4 h-full  rounded-lg flex flex-col gap-3">
            <div className="rounded-lg flex-col text-gray-text font-semibold bg-gray-bg items-start gap-2 flex p-3 ">
              <ButtonGroup />
            </div>
            <Library />
          </div>
          <div className="basis-3/4 h-full overflow-hidden  rounded-lg">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
