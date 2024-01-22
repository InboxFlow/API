import { Context } from "hono";
import type { VerifyUserUseCase } from "./VerifyUserUseCase";

class VerifyUserController {
  constructor(private verifyUserUseCase: VerifyUserUseCase) {}

  async handle(c: Context) {
    const params = c.req.param();
    return await this.verifyUserUseCase.execute(params);
  }
}

export { VerifyUserController };
