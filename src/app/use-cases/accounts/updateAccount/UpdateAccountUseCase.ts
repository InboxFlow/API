import { z } from "zod";

import { Account } from "~/app/entities";
import { AccountRepository } from "~/app/repositories/account";
import { HTTP } from "~/shared/helpers";

class UpdateAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  validate(body: any) {
    const schema = z.object({
      id: z.string({ required_error: "ID is required" }),
      avatar: z.string().optional(),
      provider: z
        .string()
        .refine((arg) => {
          const validProviders = ["google", "outlook"];
          return validProviders.includes(arg);
        }, "Invalid provider")
        .optional(),
    });

    return schema.parse(body);
  }

  async execute(body: any, params: any) {
    const { id, ...data } = this.validate({ ...body, ...params });

    const accountExists = await this.accountRepository.findById(id);
    if (!accountExists) return HTTP(400, { message: "Account not exists" });

    const account = new Account({ ...accountExists, ...data });

    await this.accountRepository.updateAccount(account);
    return HTTP(201, { message: "Account updated successfully!" });
  }
}

export { UpdateAccountUseCase };
