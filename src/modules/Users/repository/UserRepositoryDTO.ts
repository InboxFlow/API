import { UserModel } from "~/shared/models/User";

interface UserRepositoryDTO {
  findAll(): Promise<UserModel[]>;
  findById(id: string): Promise<UserModel | null>;
  findByMail(mail: string): Promise<UserModel | null>;

  createUser(data: UserModel): Promise<void>;
  updateUser(data: UserModel): Promise<void>;
  deleteUser(id: string): Promise<void>;
}

export type { UserRepositoryDTO };
