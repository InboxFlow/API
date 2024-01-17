import { UserRepository } from "../../repository/UserRepository";
import { ListUserController } from "./ListUserController";
import { ListUserUseCase } from "./ListUserUseCase";

const userRepository = new UserRepository();
const listUserUseCase = new ListUserUseCase(userRepository);
const listUserController = new ListUserController(listUserUseCase);

export const listUser = listUserController;
