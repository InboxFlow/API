import { z } from "zod";

import { AccountRepository } from "~/app/repositories/account";
import { HTTP } from "~/shared/helpers";

class ListAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  validate(params: any) {
    const schema = z.object({
      id: z.string({ required_error: "ID is required" }),
    });
    return schema.parse(params);
  }

  async execute(params: any) {
    const { id } = this.validate(params);

    const account = await this.accountRepository.findById(id);
    if (!account) return HTTP(400, { message: "Account not found" });

    return HTTP(200, { data: account, message: "Account" });
  }
}

export { ListAccountUseCase };
