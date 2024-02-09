import { z } from "zod";

import { Account } from "~/app/entities";
import { AccountRepository } from "~/app/repositories/account";
import { HTTP } from "~/shared/helpers";
import { AuthenticatedUser } from "~/shared/types";

const validProviders = ["google"];

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
        .refine((arg) => validProviders.includes(arg), "Invalid provider"),
    });

    return schema.parse(body);
  }

  async execute(body: any, user: AuthenticatedUser) {
    const { mail, ...data } = this.validate(body);

    const accountExists = await this.accountRepository.findByMail(mail);
    if (accountExists) return HTTP(400, { message: "Account already exists" });

    const account = new Account({ ...data, user_id: user.id });

    await this.accountRepository.createAccount(account);
    return HTTP(201, { message: "Account created successfully!" });
  }
}

export { CreateAccountUseCase };
