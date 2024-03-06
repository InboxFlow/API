import { Context } from "hono";
import { UpdateCallUseCase } from "./UpdateCallUseCase";

class UpdateCallController {
  constructor(private updateCallUseCase: UpdateCallUseCase) {}

  async handle(data: Context) {
    const body = await data.req.json();
    const params = data.req.param();
    return await this.updateCallUseCase.execute(body, params);
  }
}

export { UpdateCallController };
