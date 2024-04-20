import { z } from "zod";

import { CallRepository } from "~/app/repositories/call";
import { ChannelRepository } from "~/app/repositories/channel";
import { HTTP } from "~/shared/helpers";

class DeleteAllCallsUseCase {
  constructor(
    private callRepository: CallRepository,
    private channelRepository: ChannelRepository
  ) {}

  validate(params: any) {
    const schema = z.object({
      id: z.string({ required_error: "ID is required" }),
    });

    return schema.parse(params);
  }

  async execute(params: any) {
    const { id } = this.validate(params);

    const callExists = await this.channelRepository.findById(id);
    if (!callExists) return HTTP(400, { message: "Channel not exists" });

    await this.callRepository.deleteAllCalls(id);

    return HTTP(201, { message: "Calls deleted successfully!" });
  }
}

export { DeleteAllCallsUseCase };
