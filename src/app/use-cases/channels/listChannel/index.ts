import { ChannelRepository } from "~/app/repositories/channel";
import { ListChannelController } from "./ListChannelController";
import { ListChannelUseCase } from "./ListChannelUseCase";

const channelRepository = new ChannelRepository();
const listChannelUseCase = new ListChannelUseCase(channelRepository);
const listChannelController = new ListChannelController(listChannelUseCase);

export const listChannel = listChannelController;
