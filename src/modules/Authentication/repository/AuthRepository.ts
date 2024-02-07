import { eq } from "drizzle-orm";

import { users } from "~/database/schemas";
import { db } from "~/shared/services";

import type { AuthRepositoryDTO } from "./AuthRepositoryDTO";

class AuthRepository implements AuthRepositoryDTO {
  async findById(id: string) {
    return await db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }

  async findByMail(mail: string) {
    return await db.query.users.findFirst({
      where: eq(users.mail, mail),
    });
  }

  async verifyUser(id: string) {
    await db.update(users).set({ verified: true }).where(eq(users.id, id));
  }
}

export { AuthRepository };
