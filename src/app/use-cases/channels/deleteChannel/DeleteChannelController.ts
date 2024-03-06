import { Context } from "hono";
import { DeleteChannelUseCase } from "./DeleteChannelUseCase";

class DeleteChannelController {
  constructor(private deleteChannelUseCase: DeleteChannelUseCase) {}

  async handle(data: Context) {
    const params = data.req.param();
    return await this.deleteChannelUseCase.execute(params);
  }
}

export { DeleteChannelController };
