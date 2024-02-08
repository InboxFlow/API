import { Account } from "~/app/entities";

type AccountRepositoryDTO = {
  findById(id: string): Promise<Account | undefined>;
  findByMail(mail: string): Promise<Account | undefined>;
  findByUserId(user_id: string): Promise<Account[]>;

  createAccount(data: Account): Promise<void>;
  updateAccount(data: Account): Promise<void>;
  deleteAccount(id: string): Promise<void>;
};

export type { AccountRepositoryDTO };
