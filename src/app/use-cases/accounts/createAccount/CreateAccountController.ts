import { Context } from "hono";

import { AuthenticatedUser } from "~/shared/types";
import { CreateAccountUseCase } from "./CreateAccountUseCase";

class CreateAccountController {
  constructor(private createAccountUseCase: CreateAccountUseCase) {}

  async handle(data: Context) {
    const body = await data.req.json();
    const user = data.get("isAuthenticated") as AuthenticatedUser;

    return await this.createAccountUseCase.execute(body, user);
  }
}

export { CreateAccountController };
