import { z } from "zod";

import { HTTP } from "~/shared/services/http";
import type { UserRepository } from "../../repository/UserRepository";

class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  validate(params: any) {
    const schema = z.object({
      id: z.string({ required_error: "ID is required" }),
    });

    return schema.safeParse(params);
  }

  async execute(params: any) {
    const data = this.validate({ ...params });
    if (!data.success) return HTTP(400, { ...data, message: "Invalid data" });
    const { id } = data.data;

    const userExists = await this.userRepository.findById(id);
    if (!userExists) return HTTP(400, { message: "User not exists" });

    try {
      await this.userRepository.deleteUser(id);
      return HTTP(201, { message: "User deleted successfully!" });
    } catch (error) {
      return HTTP(500, { message: "Internal server error", error });
    }
  }
}

export { DeleteUserUseCase };
