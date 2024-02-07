import { UserModel } from "~/shared/models";

type UserDTO = Omit<UserModel, "password">;

interface UserRepositoryDTO {
  findAll(): Promise<UserDTO[]>;
  findById(id: string): Promise<UserDTO | undefined>;
  findByMail(mail: string): Promise<UserDTO | undefined>;

  createUser(data: UserModel): Promise<void>;
  updateUser(data: UserDTO): Promise<void>;
  deleteUser(id: string): Promise<void>;
}

export type { UserRepositoryDTO };
