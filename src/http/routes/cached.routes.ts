import { Hono } from "hono";

import { clearCache } from "~/modules/Cache/useCases/clearCache";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const cachedRoutes = new Hono();

cachedRoutes.use("/*", isAuthenticated);
cachedRoutes.get("/clear", async () => await clearCache.handle());

export { cachedRoutes };
