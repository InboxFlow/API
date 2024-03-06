import { Context } from "hono";
import { DeleteCallUseCase } from "./DeleteCallUseCase";

class DeleteCallController {
  constructor(private deleteCallUseCase: DeleteCallUseCase) {}

  async handle(data: Context) {
    const params = data.req.param();
    return await this.deleteCallUseCase.execute(params);
  }
}

export { DeleteCallController };
