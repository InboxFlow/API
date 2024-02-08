import { eq } from "drizzle-orm";

import { User } from "~/app/entities";
import { users } from "~/infra/database/mappers";
import { db } from "~/shared/services";

import { UserRepositoryDTO } from "./RepositoryDTO";

class UserRepository implements UserRepositoryDTO {
  async findAll() {
    return await db.query.users.findMany();
  }

  async findById(id: string) {
    return await db.query.users.findFirst({
      where: eq(users.id, id),
      columns: { password: false },
    });
  }

  async findByMail(mail: string) {
    return await db.query.users.findFirst({
      where: eq(users.mail, mail),
    });
  }

  async createUser(data: User) {
    await db.insert(users).values(data);
  }

  async updateUser(data: Omit<User, "password">) {
    await db.update(users).set(data).where(eq(users.id, data.id));
  }

  async deleteUser(id: string) {
    await db.delete(users).where(eq(users.id, id));
  }
}

export { UserRepository };
