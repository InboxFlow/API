import { Context } from "hono";
import type { ResendCodeUseCase } from "./resendCodeUseCase";

class ResendCodeController {
  constructor(private resendCodeUseCase: ResendCodeUseCase) {}

  async handle(c: Context) {
    const params = c.req.param();
    return await this.resendCodeUseCase.execute(params);
  }
}

export { ResendCodeController };
