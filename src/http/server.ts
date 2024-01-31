import { Hono } from "hono";

import { accountRoutes } from "./routes/accounts.routes";
import { authRoutes } from "./routes/auth.routes";
import { cachedRoutes } from "./routes/cached.routes";
import { userRoutes } from "./routes/users.routes";

const app = new Hono();

app.route("/accounts", accountRoutes);
app.route("/auth", authRoutes);
app.route("/cached", cachedRoutes);
app.route("/users", userRoutes);

export default app;
