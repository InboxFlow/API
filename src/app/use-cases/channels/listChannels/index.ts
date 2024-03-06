import { ChannelRepository } from "~/app/repositories/channel";
import { ListChannelsController } from "./ListChannelsController";
import { ListChannelsUseCase } from "./ListChannelsUseCase";

const channelRepository = new ChannelRepository();
const listChannelsUseCase = new ListChannelsUseCase(channelRepository);
const listChannelsController = new ListChannelsController(listChannelsUseCase);

export const listChannels = listChannelsController;
