import { eq } from "drizzle-orm";

import { Channel } from "~/app/entities";
import { channels } from "~/infra/database/mappers";
import { db } from "~/shared/services";

import { ChannelRepositoryDTO, SearchParams } from "./RepositoryDTO";

class ChannelRepository implements ChannelRepositoryDTO {
  async findAll(params: SearchParams) {
    return await db.query.channels.findMany({
      where: eq(channels.user_id, params.user_id),
      offset: params.offset,
      limit: params.limit,
    });
  }

  async findById(id: string) {
    return await db.query.channels.findFirst({
      where: eq(channels.id, id),
    });
  }

  async createChannel(data: Channel) {
    await db.insert(channels).values(data);
  }

  async updateChannel(data: Channel) {
    await db.update(channels).set(data).where(eq(channels.id, data.id));
  }

  async deleteChannel(id: string) {
    await db.delete(channels).where(eq(channels.id, id));
  }
}

export { ChannelRepository };
