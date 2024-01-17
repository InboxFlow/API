import type { UserModel } from "~/shared/models/User";
import type { UserRepositoryDTO } from "./UserRepositoryDTO";

import { db } from "~/shared/services/db";

class UserRepository implements UserRepositoryDTO {
  async findAll() {
    const response = await db.user.findMany();
    return response;
  }

  async findById(id: string) {
    const response = await db.user.findUnique({ where: { id } });
    return response;
  }

  async findByMail(mail: string) {
    const response = await db.user.findUnique({ where: { mail } });
    return response;
  }

  async createUser(data: UserModel) {
    await db.user.create({ data });
  }

  async updateUser(data: UserModel) {
    await db.user.update({ where: { id: data.id }, data });
  }

  async deleteUser(id: string) {
    await db.user.delete({ where: { id } });
  }
}

export { UserRepository };
