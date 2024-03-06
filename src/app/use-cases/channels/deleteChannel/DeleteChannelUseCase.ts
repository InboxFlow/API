import { z } from "zod";

import { ChannelRepository } from "~/app/repositories/channel";
import { HTTP } from "~/shared/helpers";

class DeleteChannelUseCase {
  constructor(private channelRepository: ChannelRepository) {}

  validate(params: any) {
    const schema = z.object({
      id: z.string({ required_error: "ID is required" }),
    });

    return schema.parse(params);
  }

  async execute(params: any) {
    const { id } = this.validate(params);

    const channelExists = await this.channelRepository.findById(id);
    if (!channelExists) return HTTP(400, { message: "Channel not exists" });

    await this.channelRepository.deleteChannel(id);

    return HTTP(201, { message: "Channel deleted successfully!" });
  }
}

export { DeleteChannelUseCase };
