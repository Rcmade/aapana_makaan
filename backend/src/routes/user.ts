import { upsertUser } from "@/controllers/user/upsertUser";
import { Hono } from "hono";
import { verifyAuth } from "@/lib/utils/middlewareUtils";
import { userBasicInfo, userDetailedInfo } from "@/controllers/user/userInfo";
import { getUserProperties } from "@/controllers/user/properties";

const user = new Hono()
  .post("/", async (c) => {
    const data = await c.req.json();
    const userInfo = await upsertUser(data);
    return c.json(userInfo);
  })
  .get("/info", verifyAuth, async (c) => {
    const auth = c.get("authUser");

    const userId = auth?.token?.sub;
    if (!userId) {
      return c.json(null);
    }
    const userInfo = await userBasicInfo(userId);
    return c.json(userInfo);
  })
  .get("/info/details", verifyAuth, async (c) => {
    const auth = c.get("authUser");

    const userId = auth?.token?.sub;
    if (!userId) {
      return c.json(null);
    }
    const userInfo = await userDetailedInfo(userId);
    return c.json(userInfo);
  })
  .get("/properties", verifyAuth, async (c) => {
    const auth = c.get("authUser");
    const userId = auth?.token?.sub;
    if (!userId) {
      return c.json(null);
    }
    const userProperties = await getUserProperties(userId);
    return c.json(userProperties);
  });

export default user;
