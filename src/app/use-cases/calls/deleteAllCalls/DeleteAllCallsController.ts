import { Context } from "hono";
import { DeleteAllCallsUseCase } from "./DeleteAllCallsUseCase";

class DeleteAllCallsController {
  constructor(private deleteAllCallsUseCase: DeleteAllCallsUseCase) {}

  async handle(data: Context) {
    const params = data.req.param();
    return await this.deleteAllCallsUseCase.execute(params);
  }
}

export { DeleteAllCallsController };
