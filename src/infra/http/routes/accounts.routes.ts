import { Hono } from "hono";

import { createAccount } from "~/app/use-cases/accounts/createAccount";
import { deleteAccount } from "~/app/use-cases/accounts/deleteAccount";
import { listAccount } from "~/app/use-cases/accounts/listAccount";
import { listAccounts } from "~/app/use-cases/accounts/listAccounts";
import { updateAccount } from "~/app/use-cases/accounts/updateAccount";

import { isAuthenticated } from "../middlewares/isAuthenticated";

const accountRoutes = new Hono();

accountRoutes.use("/*", isAuthenticated);
accountRoutes.post("", async (c) => await createAccount.handle(c));
accountRoutes.get("", async (c) => await listAccounts.handle(c));
accountRoutes.get("/:id", async (c) => await listAccount.handle(c));
accountRoutes.put("/:id", async (c) => await updateAccount.handle(c));
accountRoutes.delete("/:id", async (c) => await deleteAccount.handle(c));

export { accountRoutes };
