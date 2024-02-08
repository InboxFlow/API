import { User } from "~/app/entities";

interface UserRepositoryDTO {
  findAll(): Promise<Omit<User, "password">[]>;
  findById(id: string): Promise<Omit<User, "password"> | undefined>;
  findByMail(mail: string): Promise<Omit<User, "password"> | undefined>;

  createUser(data: User): Promise<void>;
  updateUser(data: Omit<User, "password">): Promise<void>;
  deleteUser(id: string): Promise<void>;
}

export { UserRepositoryDTO };
