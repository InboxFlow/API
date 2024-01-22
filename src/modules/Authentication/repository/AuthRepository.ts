import { db } from "~/shared/services/db";
import type { AuthRepositoryDTO } from "./AuthRepositoryDTO";

class AuthRepository implements AuthRepositoryDTO {
  async findByMail(mail: string) {
    return await db.user.findUnique({ where: { mail } });
  }

  async findById(id: string) {
    return await db.user.findUnique({ where: { id } });
  }

  async verifyUser(id: string) {
    await db.user.update({ where: { id }, data: { verified: true } });
  }
}

export { AuthRepository };
