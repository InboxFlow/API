import { z } from "zod";

import { HTTP } from "~/shared/services/http";
import type { AccountRepository } from "../../repository/AccountRepository";

class ListAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  validate(params: any) {
    const schema = z.object({
      id: z.string({ required_error: "ID is required" }),
    });
    return schema.safeParse(params);
  }

  async execute(params: any) {
    const data = this.validate({ ...params });
    if (!data.success) return HTTP(400, { ...data, message: "Invalid data" });
    const { id } = data.data;

    try {
      const account = await this.accountRepository.findById(id);
      if (!account) return HTTP(400, { message: "Account not found" });
      return HTTP(200, { data: account, message: "Account" });
    } catch (error) {
      return HTTP(500, { message: "Internal server error", error });
    }
  }
}

export { ListAccountUseCase };
