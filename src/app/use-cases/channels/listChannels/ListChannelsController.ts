import { Context } from "hono";
import { ListChannelsUseCase } from "./ListChannelsUseCase";

class ListChannelsController {
  constructor(private listChannelsUseCase: ListChannelsUseCase) {}

  async handle(c: Context) {
    const query = c.req.query();
    const user_id = c.get("isAuthenticated").id;

    return await this.listChannelsUseCase.execute(query, user_id);
  }
}

export { ListChannelsController };
