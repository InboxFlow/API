import { ChannelRepository } from "~/app/repositories/channel";
import { DeleteChannelController } from "./DeleteChannelController";
import { DeleteChannelUseCase } from "./DeleteChannelUseCase";

const channelRepository = new ChannelRepository();
const deleteChannelUseCase = new DeleteChannelUseCase(channelRepository);
const deleteChannelController = new DeleteChannelController(
  deleteChannelUseCase
);

export const deleteChannel = deleteChannelController;
