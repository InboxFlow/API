import { Hono } from "hono";

import { createUser } from "~/app/use-cases/users/createUser";
import { deleteUser } from "~/app/use-cases/users/deleteUser";
import { listUser } from "~/app/use-cases/users/listUser";
import { listUsers } from "~/app/use-cases/users/listUsers";
import { updateUser } from "~/app/use-cases/users/updateUser";

import { isAuthenticated } from "../middlewares/isAuthenticated";

const userRoutes = new Hono();

// Unverified route
userRoutes.post("", async (c) => await createUser.handle(c));
// Verified routes
userRoutes.use("/*", isAuthenticated);
userRoutes.get("", async (c) => await listUsers.handle(c));
userRoutes.get("/:id", async (c) => await listUser.handle(c));
userRoutes.put("/:id", async (c) => await updateUser.handle(c));
userRoutes.delete("/:id", async (c) => await deleteUser.handle(c));

export { userRoutes };
