import { AccountRepository } from "../../repository/AccountRepository";
import { UpdateAccountController } from "./UpdateAccountController";
import { UpdateAccountUseCase } from "./UpdateAccountUseCase";

const accountRepository = new AccountRepository();
const updateAccountUseCase = new UpdateAccountUseCase(accountRepository);
const updateAccountController = new UpdateAccountController(
  updateAccountUseCase
);

export const updateAccount = updateAccountController;
