import { UserDTO } from "~/shared/models/User";

interface UserRepositoryDTO {
  findAll(): Promise<UserDTO[]>;
  findById(id: string): Promise<UserDTO | null>;
  findByMail(mail: string): Promise<UserDTO | null>;

  createUser(data: UserDTO): Promise<void>;
  updateUser(data: UserDTO): Promise<void>;
  deleteUser(id: string): Promise<void>;
}

export type { UserRepositoryDTO };
