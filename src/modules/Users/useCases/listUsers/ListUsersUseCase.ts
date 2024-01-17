import { HTTP } from "~/shared/services/http";
import { UserRepository } from "../../repository/UserRepository";

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
