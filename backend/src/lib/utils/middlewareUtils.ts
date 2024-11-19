import { Context } from "hono";
import { type Next } from "hono";
import { getAuthUser } from "./authUtils";
import { UserRole } from "@/types";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { DefaultSession as DefaultSessionU } from "@auth/core/types";
declare module "@auth/core" {
  interface DefaultSession extends DefaultSessionU {
    role: UserRole;
  }
}

export const verifyAuth = async (
  c: Context,
  next: Next,
  unAuthorizedMessage?: string,
  authorizeRole?: UserRole
) => {
  const authUser = await getAuthUser(c);
  const isAuth = !!authUser?.token || !!authUser?.user;
  const unAuthorizeRes = Response.json(
    { error: unAuthorizedMessage || "Un Authorized Access" },
    {
      status: 401,
    }
  );
  if (!isAuth) {
    return unAuthorizeRes;
  } else {
    if (authUser.session && authUser.session.user) {
      authUser.session.user.id = authUser.token?.sub;
    }
    if (authorizeRole && authUser.token?.sub) {
      const [user] = await db
        .select({ role: users.role })
        .from(users)
        .where(eq(users.id, authUser.token?.sub));

      if (user.role === "ADMIN" || user.role === authorizeRole) {
        c.set("authUser", authUser);
      } else {
        return unAuthorizeRes;
      }
    } else {
      c.set("authUser", authUser);
    }
  }
  await next();
};
