import { Hono } from "hono";

import { createUser } from "~/modules/Users/useCases/createUser";
import { deleteUser } from "~/modules/Users/useCases/deleteUser";
import { listUser } from "~/modules/Users/useCases/listUser";
import { listUsers } from "~/modules/Users/useCases/listUsers";
import { updateUser } from "~/modules/Users/useCases/updateUser";

import { isAuthenticated } from "../middlewares/isAuthenticated";

const userRoutes = new Hono();

userRoutes.use("/*", isAuthenticated);

userRoutes.post("", async (c) => await createUser.handle(c));
userRoutes.delete("/:id", async (c) => await deleteUser.handle(c));
userRoutes.get("", async () => await listUsers.handle());
userRoutes.get("/:id", async (c) => await listUser.handle(c));
userRoutes.put("/:id", async (c) => await updateUser.handle(c));

export { userRoutes };
