import { HTTP } from "~/shared/helpers";
import { UserRepository } from "~/app/repositories/user";

class ListUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    try {
      const data = await this.userRepository.findAll();
      return HTTP(200, { data, message: "Users list" });
    } catch (error) {
      return HTTP(500, { message: "Internal server error", error });
    }
  }
}

export { ListUsersUseCase };
