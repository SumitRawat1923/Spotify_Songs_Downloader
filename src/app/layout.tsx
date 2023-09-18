import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import AuthContextProvider from "@/context/AuthContextProvider";
import RefreshTokenHelper from "@/context/RefreshTokenHelper";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

const inter = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify-Next",
  description: "Spotify Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <AuthContextProvider>
          <RefreshTokenHelper />
          <SkeletonTheme baseColor="#202020" highlightColor="#444" >
          {children}
          </SkeletonTheme>
        </AuthContextProvider>
      </body>
    </html>
  );
}
