import { z } from "zod";

import { Channel } from "~/app/entities";
import { ChannelRepository } from "~/app/repositories/channel";
import { HTTP } from "~/shared/helpers";

class UpdateChannelUseCase {
  constructor(private channelRepository: ChannelRepository) {}

  validate(body: any) {
    const schema = z.object({
      id: z.string({ required_error: "ID is required" }),
      name: z.string({ required_error: "Name is required" }),
    });

    return schema.parse(body);
  }

  async execute(body: any, params: any) {
    const { name, id } = this.validate({ ...body, ...params });

    const channelExists = await this.channelRepository.findById(id);
    if (!channelExists) return HTTP(400, { message: "Channel not exists" });

    const channel = new Channel({ ...channelExists, name });

    await this.channelRepository.updateChannel(channel);
    return HTTP(201, { message: "Channel updated successfully!" });
  }
}

export { UpdateChannelUseCase };
