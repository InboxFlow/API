import { CallRepository } from "~/app/repositories/call";
import { DeleteCallController } from "./DeleteCallController";
import { DeleteCallUseCase } from "./DeleteCallUseCase";

const callRepository = new CallRepository();
const deleteCallUseCase = new DeleteCallUseCase(callRepository);
const deleteCallController = new DeleteCallController(deleteCallUseCase);

export const deleteCall = deleteCallController;
