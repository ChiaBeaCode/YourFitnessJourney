import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../utils/mongo/clientPromise";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID || "",
    //   clientSecret: process.env.GOOGLE_SECRET || "",
    // }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID || "",
    //   clientSecret: process.env.GITHUB_SECRET || "",
    // }),
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      type: "credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        console.log("======== auth: entering");

        if (!credentials?.username || !credentials?.password) {
          console.log("======== auth: credentials failed");
          return null;
        }

        const client = await prisma.$connect();

        console.log("======== auth: client connected");

        try {
          console.log("======== auth: enter try block");
          const user = await prisma.user.findFirst({
            where: {
              name: credentials.username,
            },
          });

          console.log("======== auth: prisma find user", user);

          if (user) {
            const passwordVerification = await bcrypt.compare(
              credentials.password,
              user.password
            );
            console.log("======== password", passwordVerification)
            if (!passwordVerification) {
              throw new Error("======== auth: User password incorrect");

            } else {
              console.log("======== auth: username found", user);
              return user;
            }
          } else {
            console.log("======== auth: try/if else error");

            throw new Error("======== auth: User cannot be found");
          }
        } catch (err: any) {
          console.log("======== EOROROROROOE", err);
          throw new Error(err);
        } finally {
          prisma.$disconnect();
          console.log("======== auth: Closed connection");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // useSecureCookies: true,
  debug: process.env.NODE_ENV !== "production",
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
