import { UserRepository } from "~/app/repositories/user";
import { ListUsersController } from "./ListUsersController";
import { ListUsersUseCase } from "./ListUsersUseCase";

const userRepository = new UserRepository();
const listUsersUseCase = new ListUsersUseCase(userRepository);
const listUsersController = new ListUsersController(listUsersUseCase);

export const listUsers = listUsersController;
