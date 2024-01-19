import type { UserDTO, UserModel } from "~/shared/models/User";
import type { UserRepositoryDTO } from "./UserRepositoryDTO";

import { db } from "~/shared/services/db";

const select = {
  name: true,
  mail: true,
  id: true,
  verified: true,
  created_at: true,
  updated_at: true,
};

class UserRepository implements UserRepositoryDTO {
  async findAll() {
    const response = await db.user.findMany({ select });
    return response;
  }

  async findById(id: string) {
    const response = await db.user.findUnique({ where: { id }, select });
    return response;
  }

  async findByMail(mail: string) {
    const response = await db.user.findUnique({ where: { mail }, select });
    return response;
  }

  async createUser(data: UserModel) {
    await db.user.create({ data });
  }

  async updateUser(data: UserDTO) {
    await db.user.update({ where: { id: data.id }, data });
  }

  async deleteUser(id: string) {
    await db.user.delete({ where: { id } });
  }
}

export { UserRepository };
