import { z } from "zod";

import { HTTP } from "~/shared/services/http";
import type { AccountRepository } from "../../repository/AccountRepository";

class DeleteAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  validate(params: any) {
    const schema = z.object({
      id: z.string({ required_error: "ID is required" }),
    });
    return schema.safeParse(params);
  }

  async execute(params: any) {
    const data = this.validate(params);
    if (!data.success) return HTTP(400, { ...data, message: "Invalid data" });
    const { id } = data.data;

    const accountExists = await this.accountRepository.findById(id);
    if (!accountExists) return HTTP(400, { message: "Account not exists" });

    try {
      await this.accountRepository.deleteAccount(id);
      return HTTP(201, { message: "Account deleted successfully!" });
    } catch (error) {
      return HTTP(500, { message: "Internal server error", error });
    }
  }
}

export { DeleteAccountUseCase };
