import { AccountRepository } from "../../repository/AccountRepository";
import { ListAccountController } from "./ListAccountController";
import { ListAccountUseCase } from "./ListAccountUseCase";

const accountRepository = new AccountRepository();
const listAccountUseCase = new ListAccountUseCase(accountRepository);
const listAccountController = new ListAccountController(listAccountUseCase);

export const listAccount = listAccountController;
