import { Hono } from "hono";

import { HTTP } from "~/shared/helpers";
import { onError } from "./middlewares/onError";

import { authRoutes } from "./routes/auth.routes";
import { cachedRoutes } from "./routes/cached.routes";
import { callRoutes } from "./routes/call.routes";
import { channelRoutes } from "./routes/channels.routes";
import { userRoutes } from "./routes/users.routes";

const app = new Hono();

app.route("/auth", authRoutes);
app.route("/cached", cachedRoutes);
app.route("/calls", callRoutes);
app.route("/channels", channelRoutes);
app.route("/users", userRoutes);

app.onError(onError);
app.notFound(() => HTTP(404, { message: "Not Found" }));

export { app };
export default app;
