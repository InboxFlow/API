import { AccountRepository } from "../../repository/AccountRepository";
import { ListAccountsController } from "./ListAccountsController";
import { ListAccountsUseCase } from "./ListAccountsUseCase";

const accountRepository = new AccountRepository();
const listAccountsUseCase = new ListAccountsUseCase(accountRepository);
const listAccountsController = new ListAccountsController(listAccountsUseCase);

export const listAccounts = listAccountsController;
