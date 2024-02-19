import { HTTP } from "~/shared/helpers";
import { UserRepository } from "~/app/repositories/user";

class ListUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  validateQuery(query: Record<string, string>) {
    const url = new URLSearchParams(query);
    const pageParam = url.get("page");
    const limitParam = url.get("limit");

    const page = pageParam ? Number(pageParam) : 1;
    const limit = limitParam ? Number(limitParam) : 10;

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      throw new Error("Invalid query params");
    }

    return { offset: (page - 1) * limit, limit };
  }

  async execute(query: Record<string, string>) {
    const searchParams = this.validateQuery(query);
    const data = await this.userRepository.findAll(searchParams);

    return HTTP(200, { data, message: "Users list" });
  }
}

export { ListUsersUseCase };
