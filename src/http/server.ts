import { Hono } from "hono";

import { authRoutes } from "./routes/auth.routes";
import { cachedRoutes } from "./routes/cached.routes";
import { userRoutes } from "./routes/users.routes";

const app = new Hono();

app.get("/", (c) => c.text("Hello word"));
app.route("/auth", authRoutes);
app.route("/cached", cachedRoutes);
// CRUD ROUTES
app.route("/users", userRoutes);

export default {
  ...app,
  port: 8080,
};
