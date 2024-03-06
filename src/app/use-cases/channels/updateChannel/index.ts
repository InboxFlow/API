import { ChannelRepository } from "~/app/repositories/channel";
import { UpdateChannelController } from "./UpdateChannelController";
import { UpdateChannelUseCase } from "./UpdateChannelUseCase";

const channelRepository = new ChannelRepository();
const updateChannelUseCase = new UpdateChannelUseCase(channelRepository);
const updateChannelController = new UpdateChannelController(
  updateChannelUseCase
);

export const updateChannel = updateChannelController;
