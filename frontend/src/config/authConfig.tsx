import NextAuth from "next-auth";
import authProvidersConfig from "@/config/authProvidersConfig";
import axios from "axios";
import {type UpsertUserRequestT,type UpsertUserResponseT } from "@/types/apiResponse";
import { getBackendUrl } from "@/lib/utils/stringUtils";
import { upsertUserPostApi } from "@/constant/apiRoutes";
import {  headers } from "next/headers";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({}) {},
  },
  callbacks: {
    async signIn({ account, user, ...rest }) {
      if (!user?.email || !user?.name) return false;

      const formateUser = {
        email: user.email!,
        name: user.name!,
        image: user.image!,
      } satisfies UpsertUserRequestT;
      const { data } = await axios.post<UpsertUserResponseT>(
        getBackendUrl(upsertUserPostApi),
        formateUser,
        {
          withCredentials: true,
          headers: (await headers()) as any,
        },
      );

      Object.assign(user, {
        ...user,
        id: data.id || user.id,
        email: data.email || user.email,
        name: data.name || user.name,
        image: data.image || user.image,
        role: data.role || user.role,
        isNewUser: data.isNewUser || user.isNewUser,
      });

      // user.id = data.id || user.id;
      // user.email = data.email || user.email;
      // user.name = data.name || user.name;
      // user.image = data.image || user.image;
      // user.role = data.role || user.role;
      // user.isNewUser = data.isNewUser || user.isNewUser;
      return true;
    },
    async session({ session, token, ...rest }) {
      // if (session.user && token.sub) {
      //   session.user.id = token.sub;
      // }
      // if (token.role && session.user) {
      //   session.user.role = token.role as any;
      // }

      // if (session.user) {
      //   session.user.email = token?.email as string;
      //   session.user.name = token?.name as string;
      //   session.user.isOAuth = token?.isOAuth as boolean;
      //   session.user.isNewUser = token?.isNewUser as boolean;
      //   session.user.role = token.role as any;
      // }

      if (session.user) {
        session.user = {
          ...session.user,
          id: token.sub || session.user.id,
          email: token.email ?? session.user.email,
          name: token.name ?? session.user.name,
          role: (token.role as any) ?? session.user.role,
          isOAuth: !!(token.isOAuth ?? false),
          isNewUser: !!(token.isNewUser ?? false),
        };
      }
      return session;
    },
    async jwt({ token, trigger, user, account, ...rest }) {
      // if (!token.email) return token;

      // if (trigger === "signIn" || trigger === "update") {
      //   if (user?.role) {
      //     token.role = user?.role as any;
      //     token.isNewUser = user?.isNewUser as boolean;
      //   }
      // }

      if (!token.email) return token;

      if (trigger === "signIn" || user?.role) {
        Object.assign(token, {
          role: user.role,
          isNewUser: user.isNewUser,
        });
      }
      if (trigger === "update") {
        const updatedSession = rest.session;
        try {
          Object.keys(updatedSession).forEach((key) => {
            // if (key) {
            token[key] = updatedSession[key];
            // }
          });
        } catch (error) {}
      }
      // token.email = user?.email as string;
      // token.name = user?.name as string;
      // token.role = user?.role as any;
      return token;
    },
  },

  session: {
    strategy: "jwt",
  },

  ...authProvidersConfig,

  // cookies: {
  //   sessionToken: {
  //     options: {
  //       sameSite: false,
  //       httpOnly: false,
  //       secure: false,
  //     },
  //   },
  // },
  // debug: process.env.NODE_ENV === 'development',

  // cookies: {
  //   callbackUrl: process.env.AUTH_CALLBACK_COOKIE_NAME
  //     ? {
  //         name: process.env.AUTH_CALLBACK_COOKIE_NAME,
  //       }
  //     : undefined,
  // },
});
