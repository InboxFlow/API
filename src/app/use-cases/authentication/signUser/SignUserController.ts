import { Context } from "hono";

import { SignUserUseCase } from "./SignUserUseCase";

class SignUserController {
  constructor(private signUserUseCase: SignUserUseCase) {}

  async handle(c: Context) {
    const body = await c.req.json();
    return await this.signUserUseCase.execute(body);
  }
}

export { SignUserController };
