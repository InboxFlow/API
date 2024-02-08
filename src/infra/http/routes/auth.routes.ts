import { Hono } from "hono";

import { resendCode } from "~/app/use-cases/authentication/resendCode";
import { signUser } from "~/app/use-cases/authentication/signUser";
import { verifyUser } from "~/app/use-cases/authentication/verifyUser";

const authRoutes = new Hono();

authRoutes.post("/", async (c) => await signUser.handle(c));
authRoutes.post("/verify-user/:token", async (c) => await verifyUser.handle(c));
authRoutes.post("/resend-code/:mail", async (c) => await resendCode.handle(c));

export { authRoutes };
