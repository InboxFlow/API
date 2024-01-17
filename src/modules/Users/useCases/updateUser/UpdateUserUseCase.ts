import { z } from "zod";

import { UserModel } from "~/shared/models/User";
import { HTTP } from "~/shared/services/http";
import type { UserRepository } from "../../repository/UserRepository";

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

    return schema.safeParse(body);
  }

  async execute(body: any, params: any) {
    const data = this.validate({ ...body, ...params });
    if (!data.success) return HTTP(400, { ...data, message: "Invalid data" });
    const { id, mail, name } = data.data;

    const userExists = await this.userRepository.findById(id);
    if (!userExists) return HTTP(400, { message: "User not exists" });

    const user = new UserModel({
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
