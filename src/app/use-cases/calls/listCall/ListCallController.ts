import { Context } from "hono";
import { ListCallUseCase } from "./ListCallUseCase";

class ListCallController {
  constructor(private listCallUseCase: ListCallUseCase) {}

  async handle(data: Context) {
    const params = data.req.param();
    return await this.listCallUseCase.execute(params);
  }
}

export { ListCallController };
