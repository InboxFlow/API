import type { Context } from "hono";

import type { AuthenticatedUser } from "~/shared/types/AuthenticatedUser";
import type { ListAccountsUseCase } from "./ListAccountsUseCase";

class ListAccountsController {
  constructor(private listAccountsUseCase: ListAccountsUseCase) {}

  async handle(c: Context) {
    const user = c.get("isAuthenticated") as AuthenticatedUser;
    return await this.listAccountsUseCase.execute(user);
  }
}

export { ListAccountsController };
