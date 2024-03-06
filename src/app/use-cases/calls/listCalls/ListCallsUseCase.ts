import { HTTP } from "~/shared/helpers";
import { CallRepository } from "~/app/repositories/call";
import { ChannelRepository } from "~/app/repositories/channel";

class ListCallsUseCase {
  constructor(
    private callRepository: CallRepository,
    private channelRepository: ChannelRepository
  ) {}

  validateQuery(query: Record<string, string>) {
    const channel_id = query.channel_id;
    if (!channel_id) throw new Error("Internal Server Error");

    const url = new URLSearchParams(query);
    const pageParam = url.get("page");
    const limitParam = url.get("limit");

    const page = pageParam ? Number(pageParam) : 1;
    const limit = limitParam ? Number(limitParam) : 10;

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      throw new Error("Invalid query params");
    }

    return { offset: (page - 1) * limit, limit, channel_id };
  }

  async execute(query: Record<string, string>, channel_id: string) {
    const searchParams = this.validateQuery({ ...query, channel_id });

    const channel = await this.channelRepository.findById(channel_id);
    if (!channel) return HTTP(400, { message: "Channel not found" });

    const data = await this.callRepository.findAll(searchParams);

    return HTTP(200, { data, message: "Calls list" });
  }
}

export { ListCallsUseCase };
