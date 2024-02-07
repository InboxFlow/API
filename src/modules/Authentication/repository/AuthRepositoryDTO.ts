import type { UserModel } from "~/shared/models";

type AuthRepositoryDTO = {
  verifyUser: (id: string) => Promise<void>;
  findById: (id: string) => Promise<UserModel | undefined>;
  findByMail: (mail: string) => Promise<UserModel | undefined>;
};

export type { AuthRepositoryDTO };
