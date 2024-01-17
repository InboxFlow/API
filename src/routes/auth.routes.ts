import { Hono } from "hono";

const authRoutes = new Hono();

authRoutes.post("/auth", (c) => {
  return c.json(null);
});

export { authRoutes };
