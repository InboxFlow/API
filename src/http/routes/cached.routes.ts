import { Hono } from "hono";

import { clearCache } from "~/modules/Cache/useCases/clearCache";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { isVerified } from "../middlewares/isVerified";

const cachedRoutes = new Hono();

// cachedRoutes.use("/*", isAuthenticated);
// cachedRoutes.use("/*", isVerified);
cachedRoutes.get("/clear", async () => await clearCache.handle());

export { cachedRoutes };
