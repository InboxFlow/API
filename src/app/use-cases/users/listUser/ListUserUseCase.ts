import { z } from "zod";

import { HTTP } from "~/shared/helpers";
import { UserRepository } from "~/app/repositories/user";

class ListUserUseCase {
  constructor(private userRepository: UserRepository) {}

  validate(params: any) {
    const schema = z.object({
      id: z.string({ required_error: "ID is required" }),
    });
    return schema.parse(params);
  }

  async execute(params: any) {
    const { id } = this.validate(params);

    const user = await this.userRepository.findById(id);
    if (!user) return HTTP(400, { message: "User not found" });
    return HTTP(200, { data: user, message: "User" });
  }
}

export { ListUserUseCase };
