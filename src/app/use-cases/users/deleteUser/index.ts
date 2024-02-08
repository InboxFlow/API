import { CachedRepository } from "~/app/repositories/cache";
import { UserRepository } from "~/app/repositories/user";
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
