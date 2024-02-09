import { HTTP } from "~/shared/helpers";
import { UserRepository } from "~/app/repositories/user";

class ListUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute() {
    const data = await this.userRepository.findAll();
    return HTTP(200, { data, message: "Users list" });
  }
}

export { ListUsersUseCase };
