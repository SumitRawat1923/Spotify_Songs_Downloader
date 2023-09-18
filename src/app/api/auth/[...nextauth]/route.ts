//@ts-nocheck
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";
export const authOptions: AuthOptions = {
  pages: { signIn: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_ID as string,
      clientSecret: process.env.SPOTIFY_SECRET as string,
      authorization: {
        params: {
          scope: process.env.SCOPE,
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        console.log("Token Created");
        return {
          ...token,
          accessToken: account.access_token,
          expires: Math.floor(Date.now() / 1000 + 3500),
          refreshToken: account.refresh_token,
        };
      } else if (Date.now() < token.expires * 1000) {
        return token;
      } else {
        try {
          const response = await fetch(
            "https://accounts.spotify.com/api/token",
            {
              headers: {
                Authorization:
                  "Basic " +
                  new Buffer.from(
                    process.env.SPOTIFY_ID + ":" + process.env.SPOTIFY_SECRET
                  ).toString("base64"),
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: token.refreshToken,
              }),
              method: "POST",
            }
          );

          const tokens = await response.json();

          if (!response.ok) throw tokens;

          console.log("Access-Token Updated");

          return {
            name: token.name,
            accessToken: tokens.access_token,
            expires: Math.floor(Math.floor(Date.now() / 1000 + 3500)),
            refreshToken: token.refreshToken,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expires = token.expires;
      if (token.error) {
        session.error = token.error;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
