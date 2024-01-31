import { AccountModel } from "~/shared/models/Account";
import { AccountRepositoryDTO } from "./AccountRepositoryDTO";

import { db } from "~/shared/services/db";

class AccountRepository implements AccountRepositoryDTO {
  async findById(id: string) {
    return await db.account.findUnique({ where: { id } });
  }

  async findByMail(mail: string) {
    return await db.account.findUnique({ where: { mail } });
  }

  async findByUserId(user_id: string) {
    return await db.account.findMany({ where: { user_id } });
  }

  async createAccount(data: AccountModel) {
    await db.account.create({ data });
  }

  async updateAccount(data: AccountModel) {
    await db.account.update({ where: { id: data.id }, data });
  }

  async deleteAccount(id: string) {
    await db.account.delete({ where: { id } });
  }
}

export { AccountRepository };
