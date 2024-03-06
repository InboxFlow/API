import { Context } from "hono";
import { UpdateChannelUseCase } from "./UpdateChannelUseCase";

class UpdateChannelController {
  constructor(private updateChannelUseCase: UpdateChannelUseCase) {}

  async handle(data: Context) {
    const body = await data.req.json();
    const params = data.req.param();
    return await this.updateChannelUseCase.execute(body, params);
  }
}

export { UpdateChannelController };
