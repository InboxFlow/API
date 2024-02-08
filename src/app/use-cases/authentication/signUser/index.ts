import { AuthRepository } from "~/app/repositories/authentication";
import { SignUserController } from "./SignUserController";
import { SignUserUseCase } from "./SignUserUseCase";

const authRepository = new AuthRepository();
const signUserUseCase = new SignUserUseCase(authRepository);
const signUserController = new SignUserController(signUserUseCase);

export const signUser = signUserController;
