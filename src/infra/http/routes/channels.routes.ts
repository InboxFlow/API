import { Hono } from "hono";

import { createChannel } from "~/app/use-cases/channels/createChannel";
import { deleteChannel } from "~/app/use-cases/channels/deleteChannel";
import { listChannel } from "~/app/use-cases/channels/listChannel";
import { listChannels } from "~/app/use-cases/channels/listChannels";
import { updateChannel } from "~/app/use-cases/channels/updateChannel";

import { isAuthenticated } from "../middlewares/isAuthenticated";

const channelRoutes = new Hono();

channelRoutes.use("/*", isAuthenticated);
channelRoutes.post("", async (c) => await createChannel.handle(c));
channelRoutes.get("", async (c) => await listChannels.handle(c));
channelRoutes.get("/unic/:id", async (c) => await listChannel.handle(c));
channelRoutes.put("/:id", async (c) => await updateChannel.handle(c));
channelRoutes.delete("/:id", async (c) => await deleteChannel.handle(c));

export { channelRoutes };
