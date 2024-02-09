import { z } from "zod";

import { AccountRepository } from "~/app/repositories/account";
import { HTTP } from "~/shared/helpers";

class DeleteAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  validate(params: any) {
    const schema = z.object({
      id: z.string({ required_error: "ID is required" }),
    });
    return schema.parse(params);
  }

  async execute(params: any) {
    const { id } = this.validate(params);

    const accountExists = await this.accountRepository.findById(id);
    if (!accountExists) return HTTP(400, { message: "Account not exists" });

    await this.accountRepository.deleteAccount(id);
    return HTTP(201, { message: "Account deleted successfully!" });
  }
}

export { DeleteAccountUseCase };
