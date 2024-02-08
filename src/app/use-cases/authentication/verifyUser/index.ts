import { AuthRepository } from "~/app/repositories/authentication";
import { VerifyUserController } from "./VerifyUserController";
import { VerifyUserUseCase } from "./VerifyUserUseCase";

const authRepository = new AuthRepository();
const verifyUserUseCase = new VerifyUserUseCase(authRepository);
const verifyUserController = new VerifyUserController(verifyUserUseCase);

export const verifyUser = verifyUserController;
