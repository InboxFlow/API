import { Hono } from "hono";

import { userRoutes } from "./routes/users.routes";

const app = new Hono();

app.route("/users", userRoutes);

export default app;
