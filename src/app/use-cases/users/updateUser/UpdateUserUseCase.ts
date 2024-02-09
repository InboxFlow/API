import { z } from "zod";

import { User } from "~/app/entities";
import { UserRepository } from "~/app/repositories/user";
import { HTTP } from "~/shared/helpers";

class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  validate(body: any) {
    const schema = z.object({
      id: z.string({ required_error: "ID is required" }),
      name: z.string({ required_error: "Name is required" }),
      mail: z
        .string({ required_error: "Mail is required" })
        .email("Invalid email"),
    });

    return schema.parse(body);
  }

  async execute(body: any, params: any) {
    const { mail, name, id } = this.validate({ ...body, ...params });

    const userExists = await this.userRepository.findById(id);
    if (!userExists) return HTTP(400, { message: "User not exists" });

    const user = new User({ ...userExists, name, mail });

    await this.userRepository.updateUser(user);
    return HTTP(201, { message: "User updated successfully!" });
  }
}

export { UpdateUserUseCase };
