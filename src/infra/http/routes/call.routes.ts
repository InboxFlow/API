import { Hono } from "hono";

import { createCall } from "~/app/use-cases/calls/createCall";
import { deleteCall } from "~/app/use-cases/calls/deleteCall";
import { listCall } from "~/app/use-cases/calls/listCall";
import { listCalls } from "~/app/use-cases/calls/listCalls";
import { updateCall } from "~/app/use-cases/calls/updateCall";

import { isAuthenticated } from "../middlewares/isAuthenticated";

const callRoutes = new Hono();

callRoutes.use("/*", isAuthenticated);
callRoutes.post("", async (c) => await createCall.handle(c));
callRoutes.get("/:id", async (c) => await listCalls.handle(c));
callRoutes.get("/unic/:id", async (c) => await listCall.handle(c));
callRoutes.put("/:id", async (c) => await updateCall.handle(c));
callRoutes.delete("/:id", async (c) => await deleteCall.handle(c));

export { callRoutes };
