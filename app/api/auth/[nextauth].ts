import { env } from "@/env";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  theme: {
    logo: "/images/logo-text.png",
  },
  providers: [
    GithubProvider({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
    }),
    // GoogleProvider({
    //   clientId: env.GOOGLE_ID,
    //   clientSecret: env.GOOGLE_SECRET,
    // }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.image = user.image;
      return session;
    },
  },
};

export default NextAuth(authOptions);
