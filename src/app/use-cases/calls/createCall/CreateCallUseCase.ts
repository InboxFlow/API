import { z } from "zod";

import { Call } from "~/app/entities";
import { CallRepository } from "~/app/repositories/call";
import { ChannelRepository } from "~/app/repositories/channel";
import { UserRepository } from "~/app/repositories/user";
import { HTTP } from "~/shared/helpers";

class CreateCallUseCase {
  constructor(
    private callRepository: CallRepository,
    private channelRepository: ChannelRepository,
    private userRepository: UserRepository
  ) {}

  validateMethod(data: string) {
    const validateMethods = ["POST", "GET", "PUT", "DELETE"];
    if (!validateMethods.includes(data)) return false;
    return true;
  }

  validate(body: any) {
    const schema = z.object({
      channel_id: z.string({ required_error: "Channel ID is required" }),
      user_id: z.string({ required_error: "Channel ID is required" }),
      method: z
        .string({ required_error: "Method is required" })
        .refine(this.validateMethod, "Method is invalid"),
      request: z.string({ required_error: "Request is required" }),
      response: z.string({ required_error: "Response is required" }),
      token: z.string({ required_error: "Token is required" }),
    });

    return schema.parse(body);
  }

  async execute(body: any) {
    const { channel_id, user_id, ...rest } = this.validate(body);

    const [channel, user] = await Promise.all([
      await this.channelRepository.findById(channel_id),
      await this.userRepository.findById(user_id),
    ]);

    if (!channel) return HTTP(400, { message: "Channel not found" });
    if (!user) return HTTP(400, { message: "User not found" });

    const call = new Call({ channel_id, user_id, ...rest });
    await this.callRepository.createCall(call);

    return HTTP(201, {
      message: "Call created successfully!",
    });
  }
}

export { CreateCallUseCase };
