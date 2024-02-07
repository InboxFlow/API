import { eq } from "drizzle-orm";

import { accounts } from "~/database/schemas";
import { AccountModel } from "~/shared/models";
import { db } from "~/shared/services";

import { AccountRepositoryDTO } from "./AccountRepositoryDTO";

class AccountRepository implements AccountRepositoryDTO {
  async findById(id: string) {
    return await db.query.accounts.findFirst({
      where: eq(accounts.id, id),
    });
  }

  async findByMail(mail: string) {
    return await db.query.accounts.findFirst({
      where: eq(accounts.mail, mail),
    });
  }

  async findByUserId(user_id: string) {
    return await db.query.accounts.findMany({
      where: eq(accounts.user_id, user_id),
    });
  }

  async createAccount(data: AccountModel) {
    await db.insert(accounts).values(data);
  }

  async updateAccount(data: AccountModel) {
    await db.update(accounts).set(data).where(eq(accounts.id, data.id));
  }

  async deleteAccount(id: string) {
    await db.delete(accounts).where(eq(accounts.id, id));
  }
}

export { AccountRepository };
