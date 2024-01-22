import { CachedRepository } from "~/modules/Cache/repository/CachedRepository";
import { UserRepository } from "../../repository/UserRepository";
import { DeleteUserController } from "./DeleteUserController";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

const userRepository = new UserRepository();
const cachedRepository = new CachedRepository();
const deleteUserUseCase = new DeleteUserUseCase(
  userRepository,
  cachedRepository
);
const deleteUserController = new DeleteUserController(deleteUserUseCase);

export const deleteUser = deleteUserController;
