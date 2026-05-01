import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "./inversify.types";
import AuthController from "../modules/authentication/auth.controller";
import AuthService from "../modules/authentication/auth.service";
import AuthValidator from "../shared/validator/user.validator";
import UserRepository from "../shared/user/user.repository";

const container = new Container();

// Authentication bindings
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<AuthValidator>(TYPES.UserValidator).to(AuthValidator);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);

export default container;
