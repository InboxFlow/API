import { z } from "zod";

import { AccountModel } from "~/shared/models/Account";
import { HTTP } from "~/shared/services/http";
import { AuthenticatedUser } from "~/shared/types/AuthenticatedUser";

import type { AccountRepository } from "../../repository/AccountRepository";

class CreateAccountUseCase {
  constructor(private accountRepository: AccountRepository) {}

  validate(body: any) {
    const schema = z.object({
      avatar: z.string({ required_error: "Avatar is required" }),
      mail: z
        .string({ required_error: "Mail is required" })
        .email("Invalid email"),
      provider: z
        .string({ required_error: "Avatar is required" })
        .refine((arg) => {
          const validProviders = ["google", "outlook"];
          return validProviders.includes(arg);
        }, "Invalid provider"),
    });

    return schema.safeParse(body);
  }

  async execute(body: any, user: AuthenticatedUser) {
    const data = this.validate(body);
    if (!data.success) return HTTP(400, { ...data, message: "Invalid data" });
    const { mail } = data.data;

    const accountExists = await this.accountRepository.findByMail(mail);
    if (accountExists) return HTTP(400, { message: "Account already exists" });

    const account = new AccountModel({ ...data.data, user_id: user.id });

    try {
      await this.accountRepository.createAccount(account);
      return HTTP(201, { message: "Account created successfully!" });
    } catch (error) {
      return HTTP(500, { message: "Internal server error", error });
    }
  }
}

export { CreateAccountUseCase };
