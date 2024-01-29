import { Hono } from "hono";

import { resendCode } from "~/modules/Authentication/useCases/resendCode";
import { signUser } from "~/modules/Authentication/useCases/signUser";
import { verifyUser } from "~/modules/Authentication/useCases/verifyUser";

const authRoutes = new Hono();

authRoutes.post("/", async (c) => await signUser.handle(c));
authRoutes.post("/verify-user/:token", async (c) => await verifyUser.handle(c));
authRoutes.post("/resend-code/:mail", async (c) => await resendCode.handle(c));

export { authRoutes };
