import { UserRepository } from "../../repository/UserRepository";
import { ListUsersController } from "./ListUsersController";
import { ListUsersUseCase } from "./ListUsersUseCase";

const userRepository = new UserRepository();
const listUsersUseCase = new ListUsersUseCase(userRepository);
const listUsersController = new ListUsersController(listUsersUseCase);

export const listUsers = listUsersController;
