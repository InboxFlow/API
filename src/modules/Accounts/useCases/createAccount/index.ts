import { AccountRepository } from "../../repository/AccountRepository";
import { CreateAccountController } from "./CreateAccountController";
import { CreateAccountUseCase } from "./CreateAccountUseCase";

const accountRepository = new AccountRepository();
const createAccountUseCase = new CreateAccountUseCase(accountRepository);
const createAccountController = new CreateAccountController(
  createAccountUseCase
);

export const createAccount = createAccountController;
