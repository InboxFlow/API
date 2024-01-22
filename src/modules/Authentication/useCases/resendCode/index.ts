import { AuthRepository } from "../../repository/AuthRepository";
import { ResendCodeController } from "./resendCodeController";
import { ResendCodeUseCase } from "./resendCodeUseCase";

const authRepository = new AuthRepository();
const resendCodeUseCase = new ResendCodeUseCase(authRepository);
const resendCodeController = new ResendCodeController(resendCodeUseCase);

export const resendCode = resendCodeController;
