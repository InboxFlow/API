import type { Context } from "hono";
import type { DeleteAccountUseCase } from "./DeleteAccountUseCase";

class DeleteAccountController {
  constructor(private deleteAccountUseCase: DeleteAccountUseCase) {}

  async handle(data: Context) {
    const params = data.req.param();
    return await this.deleteAccountUseCase.execute(params);
  }
}

export { DeleteAccountController };
