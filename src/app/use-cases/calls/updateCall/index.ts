import { CallRepository } from "~/app/repositories/call";
import { UpdateCallController } from "./UpdateCallController";
import { UpdateCallUseCase } from "./UpdateCallUseCase";

const callRepository = new CallRepository();
const updateCallUseCase = new UpdateCallUseCase(callRepository);
const updateCallController = new UpdateCallController(updateCallUseCase);

export const updateCall = updateCallController;
