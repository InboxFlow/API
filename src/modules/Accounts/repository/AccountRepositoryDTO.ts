import { AccountModel } from "~/shared/models/Account";

type AccountRepositoryDTO = {
  findById(id: string): Promise<AccountModel | undefined>;
  findByMail(mail: string): Promise<AccountModel | undefined>;
  findByUserId(user_id: string): Promise<AccountModel[]>;

  createAccount(data: AccountModel): Promise<void>;
  updateAccount(data: AccountModel): Promise<void>;
  deleteAccount(id: string): Promise<void>;
};

export type { AccountRepositoryDTO };
