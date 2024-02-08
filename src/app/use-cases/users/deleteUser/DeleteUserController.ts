import { Context } from "hono";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(data: Context) {
    const params = data.req.param();
    return await this.deleteUserUseCase.execute(params);
  }
}

export { DeleteUserController };
