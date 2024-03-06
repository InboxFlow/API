import { Context } from "hono";

import { CreateChannelUseCase } from "./CreateChannelUseCase";

class CreateChannelController {
  constructor(private createChannelUseCase: CreateChannelUseCase) {}

  async handle(c: Context) {
    const body = await c.req.json();
    const user_id = c.get("isAuthenticated").id;

    return await this.createChannelUseCase.execute(body, user_id);
  }
}

export { CreateChannelController };
