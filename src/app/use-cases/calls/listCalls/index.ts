import { CallRepository } from "~/app/repositories/call";
import { ListCallsController } from "./ListCallsController";
import { ListCallsUseCase } from "./ListCallsUseCase";
import { ChannelRepository } from "~/app/repositories/channel";

const callRepository = new CallRepository();
const channelRepository = new ChannelRepository();
const listCallsUseCase = new ListCallsUseCase(
  callRepository,
  channelRepository
);
const listCallsController = new ListCallsController(listCallsUseCase);

export const listCalls = listCallsController;
