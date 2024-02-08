import { AccountRepository } from "~/app/repositories/account";
import { HTTP } from "~/shared/helpers";
import { AuthenticatedUser } from "~/shared/types";

class ListAccountsUseCase {
  constructor(private accountRepository: AccountRepository) {}

  async execute(user: AuthenticatedUser) {
    try {
      const data = await this.accountRepository.findByUserId(user.id);
      return HTTP(200, { data, message: "Accounts list" });
    } catch (error) {
      return HTTP(500, { message: "Internal server error", error });
    }
  }
}

export { ListAccountsUseCase };