import { Context } from "hono";
import type { ListUserUseCase } from "./ListUserUseCase";

class ListUserController {
  constructor(private listUserUseCase: ListUserUseCase) {}

  async handle(data: Context) {
    const params = data.req.param();
    return await this.listUserUseCase.execute(params);
  }
}

export { ListUserController };
