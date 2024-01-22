import type { UserModel } from "~/shared/models/User";

type AuthRepositoryDTO = {
  verifyUser: (id: string) => Promise<void>;
  findById: (id: string) => Promise<UserModel | null>;
  findByMail: (mail: string) => Promise<UserModel | null>;
};

export type { AuthRepositoryDTO };
