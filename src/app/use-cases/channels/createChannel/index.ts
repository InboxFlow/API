import { ChannelRepository } from "~/app/repositories/channel";
import { CreateChannelController } from "./CreateChannelController";
import { CreateChannelUseCase } from "./CreateChannelUseCase";

const channelRepository = new ChannelRepository();
const createChannelUseCase = new CreateChannelUseCase(channelRepository);
const createChannelController = new CreateChannelController(
  createChannelUseCase
);

export const createChannel = createChannelController;
