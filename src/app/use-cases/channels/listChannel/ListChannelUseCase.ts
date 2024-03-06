import { z } from "zod";

import { HTTP } from "~/shared/helpers";
import { ChannelRepository } from "~/app/repositories/channel";

class ListChannelUseCase {
  constructor(private channelRepository: ChannelRepository) {}

  validate(params: any) {
    const schema = z.object({
      id: z.string({ required_error: "ID is required" }),
    });
    return schema.parse(params);
  }

  async execute(params: any) {
    const { id } = this.validate(params);

    const channel = await this.channelRepository.findById(id);
    if (!channel) return HTTP(400, { message: "Channel not found" });

    return HTTP(200, { data: channel, message: "Channel" });
  }
}

export { ListChannelUseCase };
