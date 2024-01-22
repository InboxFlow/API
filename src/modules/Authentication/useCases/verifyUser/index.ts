import { AuthRepository } from "../../repository/AuthRepository";
import { VerifyUserController } from "./VerifyUserController";
import { VerifyUserUseCase } from "./VerifyUserUseCase";

const authRepository = new AuthRepository();
const verifyUserUseCase = new VerifyUserUseCase(authRepository);
const verifyUserController = new VerifyUserController(verifyUserUseCase);

export const verifyUser = verifyUserController;
