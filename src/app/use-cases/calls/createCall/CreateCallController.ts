import { Context } from "hono";

import { CreateCallUseCase } from "./CreateCallUseCase";

class CreateCallController {
  constructor(private createCallUseCase: CreateCallUseCase) {}

  async handle(c: Context) {
    const body = await c.req.json();
    const user_id = c.get("isAuthenticated").id;

    return await this.createCallUseCase.execute({ ...body, user_id });
  }
}

export { CreateCallController };
