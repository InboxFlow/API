import { Context } from "hono";
import { ListCallsUseCase } from "./ListCallsUseCase";

class ListCallsController {
  constructor(private listCallsUseCase: ListCallsUseCase) {}

  async handle(c: Context) {
    const call_id = c.req.param().id;
    const query = c.req.query();

    return await this.listCallsUseCase.execute(query, call_id);
  }
}

export { ListCallsController };
