import { Context } from "hono";

import { AuthenticatedUser } from "~/shared/types";
import { ListAccountsUseCase } from "./ListAccountsUseCase";

class ListAccountsController {
  constructor(private listAccountsUseCase: ListAccountsUseCase) {}

  async handle(c: Context) {
    const user = c.get("isAuthenticated") as AuthenticatedUser;
    return await this.listAccountsUseCase.execute(user);
  }
}

export { ListAccountsController };
