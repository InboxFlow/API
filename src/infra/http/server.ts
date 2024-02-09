import { Hono } from "hono";

import { onError } from "./middlewares/onError";

import { accountRoutes } from "./routes/accounts.routes";
import { authRoutes } from "./routes/auth.routes";
import { cachedRoutes } from "./routes/cached.routes";
import { userRoutes } from "./routes/users.routes";
import { HTTP } from "~/shared/helpers";

const app = new Hono();

app.route("/accounts", accountRoutes);
app.route("/auth", authRoutes);
app.route("/cached", cachedRoutes);
app.route("/users", userRoutes);

app.onError(onError);
app.notFound(() => HTTP(404, { message: "Not Found" }));

export { app };
export default app;
