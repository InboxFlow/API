import { HTTP } from "~/shared/helpers";
import { ChannelRepository } from "~/app/repositories/channel";

class ListChannelsUseCase {
  constructor(private channelRepository: ChannelRepository) {}

  validateQuery(query: Record<string, string>) {
    const user_id = query.user_id;
    if (!user_id) throw new Error("Internal Server Error");

    const url = new URLSearchParams(query);
    const pageParam = url.get("page");
    const limitParam = url.get("limit");

    const page = pageParam ? Number(pageParam) : 1;
    const limit = limitParam ? Number(limitParam) : 10;

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      throw new Error("Invalid query params");
    }

    return { offset: (page - 1) * limit, limit, user_id };
  }

  async execute(query: Record<string, string>, user_id: string) {
    const searchParams = this.validateQuery({ ...query, user_id });
    const data = await this.channelRepository.findAll(searchParams);

    return HTTP(200, { data, message: "Channels list" });
  }
}

export { ListChannelsUseCase };
