import { ListUsersUseCase } from "./ListUsersUseCase";

class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}

  async handle() {
    return await this.listUsersUseCase.execute();
  }
}

export { ListUsersController };
