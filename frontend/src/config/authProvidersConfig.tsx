import type { NextAuthConfig } from "next-auth";

const authProvidersConfig = {
  providers: [
    {
      id: "rauth",
      name: "rauth",
      type: "oidc",
      issuer: `${process.env.AUTH_RAUTH_BASE_URL}`,
      clientId: process.env.AUTH_RAUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_RAUTH_CLIENT_SECRET,
      token: `${process.env.AUTH_RAUTH_BASE_URL}/api/rauth/token`,
      wellKnown: `${process.env.AUTH_RAUTH_BASE_URL}/.well-known/openid-configuration`,
      checks: [
        "pkce", "state"
      ],
    },
  ],
} satisfies NextAuthConfig;

export default authProvidersConfig;
