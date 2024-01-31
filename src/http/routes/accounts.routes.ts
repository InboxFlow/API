import { Hono } from "hono";

import { createAccount } from "~/modules/Accounts/useCases/createAccount";
import { deleteAccount } from "~/modules/Accounts/useCases/deleteAccount";
import { listAccount } from "~/modules/Accounts/useCases/listAccount";
import { listAccounts } from "~/modules/Accounts/useCases/listAccounts";
import { updateAccount } from "~/modules/Accounts/useCases/updateAccount";

import { isAuthenticated } from "../middlewares/isAuthenticated";

const accountRoutes = new Hono();

accountRoutes.use("/*", isAuthenticated);
accountRoutes.post("", async (c) => await createAccount.handle(c));
accountRoutes.get("", async (c) => await listAccounts.handle(c));
accountRoutes.get("/:id", async (c) => await listAccount.handle(c));
accountRoutes.put("/:id", async (c) => await updateAccount.handle(c));
accountRoutes.delete("/:id", async (c) => await deleteAccount.handle(c));

export { accountRoutes };
