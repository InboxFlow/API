import { z } from "zod";

import { HTTP } from "~/shared/services";
import { UserRepository } from "../../repository/UserRepository";

class ListUserUseCase {
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

    try {
      const user = await this.userRepository.findById(id);
      if (!user) return HTTP(400, { message: "User not found" });
      return HTTP(200, { data: user, message: "User" });
    } catch (error) {
      return HTTP(500, { message: "Internal server error", error });
    }
  }
}

export { ListUserUseCase };
