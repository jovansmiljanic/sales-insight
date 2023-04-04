// Vendors
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Vendor types
import type { NextAuthOptions } from "next-auth";

// Types
import type { NextApiRequest, NextApiResponse } from "next";

// Global types
import type { User as UserType } from "@types";
import axios from "axios";

interface Configuration {
  res: NextApiResponse;
}

const nextAuthOptions = ({ res }: Configuration): NextAuthOptions => {
  return {
    // https://next-auth.js.org/configuration/providers
    providers: [
      Credentials({
        id: "Login",
        name: "Login",
        credentials: {
          userName: { label: "User name", type: "text" },
          password: { label: "Password", type: "password" },
        },

        authorize: async (credentials, req) => {
          try {
            // Grab user name and password from the submitted form
            const { userName, password } = credentials as {
              userName: string;
              password: string;
            };

            const response = await axios.post(
              "http://localhost:8000/api/v1/auth",
              {
                username: userName,
                password: password,
              }
            );

            if (response.status === 200 && response.data.token.access_token) {
              console.log(response.data.access_token);

              return response.data;
            } else {
              console.log("err");
            }
          } catch (error) {
            console.log(error);
          }
        },
      }),
    ],

    secret: process.env.SECRET,

    session: {
      strategy: "jwt",
      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 60 * 60 * 24 * 30,
    },

    jwt: {
      secret: process.env.SECRET,
    },

    // pages: {},
    callbacks: {
      async session({ session, token: { user } }) {
        user && (session.user = user as UserType);

        // Assign user on the current session
        res?.setHeader("set-cookie", [
          `user=${JSON.stringify(
            session.user.token.access_token
          )}; max-age=60 * 60 * 24 * 30; path=/; samesite=lax;`,
        ]);

        return session;
      },

      async jwt({ token, user }) {
        // Assign current token to the user object
        user && (token.user = user);
        return token;
      },
    },
    // events: {},
    // Enable debug messages in the console if you are having problems
    debug: false,
  };
};

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, nextAuthOptions({ res }));
