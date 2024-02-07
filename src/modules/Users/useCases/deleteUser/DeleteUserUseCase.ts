import { z } from "zod";

import { HTTP } from "~/shared/services";
import { CachedRepository } from "~/modules/Cache/repository/CachedRepository";
import type { UserRepository } from "../../repository/UserRepository";

class DeleteUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private cachedRepository: CachedRepository
  ) {}

  validate(params: any) {
    const schema = z.object({
      id: z.string({ required_error: "ID is required" }),
    });

    return schema.safeParse(params);
  }

  async execute(params: any) {
    const data = this.validate(params);
    if (!data.success) return HTTP(400, { ...data, message: "Invalid data" });
    const { id } = data.data;

    const userExists = await this.userRepository.findById(id);
    if (!userExists) return HTTP(400, { message: "User not exists" });

    try {
      await this.cachedRepository.delete(`user-${id}`);
      await this.cachedRepository.delete(`verified-${id}`);

      await this.userRepository.deleteUser(id);
      return HTTP(201, { message: "User deleted successfully!" });
    } catch (error) {
      return HTTP(500, { message: "Internal server error", error });
    }
  }
}

export { DeleteUserUseCase };
