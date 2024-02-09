import { z } from "zod";

import { CachedRepository } from "~/app/repositories/cache";
import { UserRepository } from "~/app/repositories/user";
import { HTTP } from "~/shared/helpers";

class DeleteUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private cachedRepository: CachedRepository
  ) {}

  validate(params: any) {
    const schema = z.object({
      id: z.string({ required_error: "ID is required" }),
    });

    return schema.parse(params);
  }

  async execute(params: any) {
    const { id } = this.validate(params);

    const userExists = await this.userRepository.findById(id);
    if (!userExists) return HTTP(400, { message: "User not exists" });

    await this.cachedRepository.delete(`user-${id}`);
    await this.cachedRepository.delete(`verified-${id}`);
    await this.userRepository.deleteUser(id);

    return HTTP(201, { message: "User deleted successfully!" });
  }
}

export { DeleteUserUseCase };
