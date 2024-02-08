import { z } from "zod";

import { User } from "~/app/entities";
import { UserRepository } from "~/app/repositories/user";
import { HTTP } from "~/shared/helpers";

class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  validate(body: any) {
    const schema = z.object({
      name: z.string({ required_error: "Name is required" }),
      mail: z
        .string({ required_error: "Mail is required" })
        .email("Invalid email"),
    });

    return schema.safeParse(body);
  }

  async execute(body: any, params: any) {
    const data = this.validate(body);
    const id = params.id;

    if (!id) return HTTP(400, { message: "ID is required" });
    if (!data.success) return HTTP(400, { ...data, message: "Invalid data" });

    const { mail, name } = data.data;

    const userExists = await this.userRepository.findById(id);
    if (!userExists) return HTTP(400, { message: "User not exists" });

    const user = new User({
      ...userExists,
      name,
      mail,
    });

    try {
      await this.userRepository.updateUser(user);
      return HTTP(201, { message: "User updated successfully!" });
    } catch (error) {
      return HTTP(500, { message: "Internal server error", error });
    }
  }
}

export { UpdateUserUseCase };
