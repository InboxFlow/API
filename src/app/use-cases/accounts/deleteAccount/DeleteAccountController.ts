import { Context } from "hono";

import { DeleteAccountUseCase } from "./DeleteAccountUseCase";

class DeleteAccountController {
  constructor(private deleteAccountUseCase: DeleteAccountUseCase) {}

  async handle(data: Context) {
    const params = data.req.param();
    return await this.deleteAccountUseCase.execute(params);
  }
}

export { DeleteAccountController };
