import { Context } from "hono";
import { ListUsersUseCase } from "./ListUsersUseCase";

class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}

  async handle(c: Context) {
    const query = c.req.query();
    return await this.listUsersUseCase.execute(query);
  }
}

export { ListUsersController };
