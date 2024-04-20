import { eq } from "drizzle-orm";

import { Call } from "~/app/entities";
import { calls } from "~/infra/database/mappers";
import { db } from "~/shared/services";

import { CallRepositoryDTO, SearchParams } from "./RepositoryDTO";

class CallRepository implements CallRepositoryDTO {
  async findAll(params: SearchParams) {
    return await db.query.calls.findMany({
      where: eq(calls.channel_id, params.channel_id),
      offset: params.offset,
      limit: params.limit,
    });
  }

  async findById(id: string) {
    return await db.query.calls.findFirst({
      where: eq(calls.id, id),
    });
  }

  async createCall(data: Call) {
    await db.insert(calls).values(data);
  }

  async updateCall(data: Call) {
    await db.update(calls).set(data).where(eq(calls.id, data.id));
  }

  async deleteCall(id: string) {
    await db.delete(calls).where(eq(calls.id, id));
  }

  async deleteAllCalls(channel_id: string) {
    await db.delete(calls).where(eq(calls.channel_id, channel_id));
  }
}

export { CallRepository };
