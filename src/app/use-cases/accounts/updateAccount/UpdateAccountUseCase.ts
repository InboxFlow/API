import { z } from "zod";

import { Account } from "~/app/entities";
import { AccountRepository } from "~/app/repositories/account";
import { HTTP } from "~/shared/helpers";

class UpdateAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  validate(body: any) {
    const schema = z.object({
      avatar: z.string().optional(),
      provider: z
        .string()
        .refine((arg) => {
          const validProviders = ["google", "outlook"];
          return validProviders.includes(arg);
        }, "Invalid provider")
        .optional(),
    });

    return schema.safeParse(body);
  }

  async execute(body: any, params: any) {
    const data = this.validate(body);
    const id = params.id;

    if (!id) return HTTP(400, { message: "ID is required" });
    if (!data.success) return HTTP(400, { ...data, message: "Invalid data" });

    const accountExists = await this.accountRepository.findById(id);
    if (!accountExists) return HTTP(400, { message: "Account not exists" });

    const account = new Account({ ...accountExists, ...data.data });

    try {
      await this.accountRepository.updateAccount(account);
      return HTTP(201, { message: "Account updated successfully!" });
    } catch (error) {
      return HTTP(500, { message: "Internal server error", error });
    }
  }
}

export { UpdateAccountUseCase };
