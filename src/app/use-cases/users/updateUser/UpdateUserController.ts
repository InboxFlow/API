import { Context } from "hono";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(data: Context) {
    const body = await data.req.json();
    const params = data.req.param();
    return await this.updateUserUseCase.execute(body, params);
  }
}

export { UpdateUserController };
