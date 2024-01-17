import type { Context } from "hono";
import type { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(data: Context) {
    const body = await data.req.json();
    return await this.createUserUseCase.execute(body);
  }
}

export { CreateUserController };
