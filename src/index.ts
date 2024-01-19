import { Hono } from "hono";

import { authRoutes } from "./routes/auth.routes";
import { userRoutes } from "./routes/users.routes";

const app = new Hono();

app.route("/auth", authRoutes);
app.route("/users", userRoutes);

export default app;
