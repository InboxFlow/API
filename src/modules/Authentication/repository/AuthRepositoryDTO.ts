import type { UserModel } from "~/shared/models/User";

type AuthRepositoryDTO = {
  verifyUser: (id: string) => Promise<void>;
  findByMail: (mail: string) => Promise<UserModel | null>;
};

export type { AuthRepositoryDTO };
