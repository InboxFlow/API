import type { Context } from "hono";
import type { DeleteUserUseCase } from "./DeleteUserUseCase";

class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(data: Context) {
    const params = data.req.param();
    return await this.deleteUserUseCase.execute(params);
  }
}

export { DeleteUserController };
