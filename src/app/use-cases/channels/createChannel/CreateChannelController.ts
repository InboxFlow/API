import { Context } from "hono";

import { CreateChannelUseCase } from "./CreateChannelUseCase";

class CreateChannelController {
  constructor(private createChannelUseCase: CreateChannelUseCase) {}

  async handle(data: Context) {
    const body = await data.req.json();
    return await this.createChannelUseCase.execute(body);
  }
}

export { CreateChannelController };
