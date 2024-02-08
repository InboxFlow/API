import { User } from "~/app/entities";

type AuthRepositoryDTO = {
  verifyUser: (id: string) => Promise<void>;
  findById: (id: string) => Promise<User | undefined>;
  findByMail: (mail: string) => Promise<User | undefined>;
};

export { AuthRepositoryDTO };
