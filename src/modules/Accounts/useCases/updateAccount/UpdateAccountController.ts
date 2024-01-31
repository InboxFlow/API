import type { Context } from "hono";
import type { UpdateAccountUseCase } from "./UpdateAccountUseCase";

class UpdateAccountController {
  constructor(private updateAccountUseCase: UpdateAccountUseCase) {}

  async handle(data: Context) {
    const body = await data.req.json();
    const params = data.req.param();
    return await this.updateAccountUseCase.execute(body, params);
  }
}

export { UpdateAccountController };
