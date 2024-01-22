import { Hono } from "hono";

import { signUser } from "~/modules/Authentication/useCases/signUser";
import { verifyUser } from "~/modules/Authentication/useCases/verifyUser";

const authRoutes = new Hono();

authRoutes.post("", async (c) => await signUser.handle(c));
authRoutes.post("/:token", async (c) => await verifyUser.handle(c));

export { authRoutes };
