import { AccountRepository } from "~/app/repositories/account";
import { UpdateAccountController } from "./UpdateAccountController";
import { UpdateAccountUseCase } from "./UpdateAccountUseCase";

const accountRepository = new AccountRepository();
const updateAccountUseCase = new UpdateAccountUseCase(accountRepository);
const updateAccountController = new UpdateAccountController(
  updateAccountUseCase
);

export const updateAccount = updateAccountController;
