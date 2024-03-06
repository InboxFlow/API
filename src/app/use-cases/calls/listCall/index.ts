import { CallRepository } from "~/app/repositories/call";
import { ListCallController } from "./ListCallController";
import { ListCallUseCase } from "./ListCallUseCase";

const callRepository = new CallRepository();
const listCallUseCase = new ListCallUseCase(callRepository);
const listCallController = new ListCallController(listCallUseCase);

export const listCall = listCallController;
