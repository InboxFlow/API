import { CallRepository } from "~/app/repositories/call";
import { CreateCallController } from "./CreateCallController";
import { CreateCallUseCase } from "./CreateCallUseCase";
import { UserRepository } from "~/app/repositories/user";
import { ChannelRepository } from "~/app/repositories/channel";

const callRepository = new CallRepository();
const channelRepository = new ChannelRepository();
const userRepository = new UserRepository();
const createCallUseCase = new CreateCallUseCase(
  callRepository,
  channelRepository,
  userRepository
);
const createCallController = new CreateCallController(createCallUseCase);

export const createCall = createCallController;
