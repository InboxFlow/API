import { z } from "zod";

import { Channel } from "~/app/entities";
import { ChannelRepository } from "~/app/repositories/channel";
import { HTTP } from "~/shared/helpers";

class CreateChannelUseCase {
  constructor(private channelRepository: ChannelRepository) {}

  validate(body: any) {
    const schema = z.object({
      name: z.string({ required_error: "Name is required" }),
      user_id: z.string({ required_error: "User ID is required" }),
    });

    return schema.parse(body);
  }

  async execute(body: any, user_id: string) {
    const validatedData = this.validate({ ...body, user_id });

    const channel = new Channel(validatedData);

    await this.channelRepository.createChannel(channel);

    return HTTP(201, {
      message: "Channel created successfully!",
    });
  }
}

export { CreateChannelUseCase };
