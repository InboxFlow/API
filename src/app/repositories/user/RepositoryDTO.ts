import { User } from "~/app/entities";

interface SearchParams {
  offset: number;
  limit: number;
}

interface UserRepositoryDTO {
  findAll(searchParams: SearchParams): Promise<Omit<User, "password">[]>;
  findById(id: string): Promise<Omit<User, "password"> | undefined>;
  findByMail(mail: string): Promise<Omit<User, "password"> | undefined>;

  createUser(data: User): Promise<void>;
  updateUser(data: Omit<User, "password">): Promise<void>;
  deleteUser(id: string): Promise<void>;
}

export { SearchParams, UserRepositoryDTO };
