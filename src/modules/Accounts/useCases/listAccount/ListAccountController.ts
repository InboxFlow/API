import { Context } from "hono";

import type { ListAccountUseCase } from "./ListAccountUseCase";

class ListAccountController {
  constructor(private listAccountUseCase: ListAccountUseCase) {}

  async handle(c: Context) {
    const params = c.req.param();
    return await this.listAccountUseCase.execute(params);
  }
}

export { ListAccountController };
