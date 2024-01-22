import { Hono } from "hono";
import { signUser } from "~/modules/Authentication/useCases/signUser";

const authRoutes = new Hono();

authRoutes.post("", async (c) => await signUser.handle(c));

export { authRoutes };
