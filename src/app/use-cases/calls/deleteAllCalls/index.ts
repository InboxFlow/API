import { CallRepository } from "~/app/repositories/call";
import { ChannelRepository } from "~/app/repositories/channel";
import { DeleteAllCallsController } from "./DeleteAllCallsController";
import { DeleteAllCallsUseCase } from "./DeleteAllCallsUseCase";

const callRepository = new CallRepository();
const channelRepository = new ChannelRepository();

const deleteAllCallsUseCase = new DeleteAllCallsUseCase(
  callRepository,
  channelRepository
);
const deleteAllCallsController = new DeleteAllCallsController(
  deleteAllCallsUseCase
);

export const deleteAllCalls = deleteAllCallsController;
