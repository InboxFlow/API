import { Context } from "hono";
import { ListChannelUseCase } from "./ListChannelUseCase";

class ListChannelController {
  constructor(private listChannelUseCase: ListChannelUseCase) {}

  async handle(data: Context) {
    const params = data.req.param();
    return await this.listChannelUseCase.execute(params);
  }
}

export { ListChannelController };
