import { inject, injectable } from "inversify";
import { ConflictError, NotFoundError } from "../error/errors";
import TYPES from "../../di/inversify.types";
import UserRepository from "../user/user.repository";
import { User } from "../user/user.types";

@injectable()
export default class AuthValidator {
  constructor(
    @inject(TYPES.UserRepository) private readonly userRepo: UserRepository,
  ) {}

  public ensureUserWithEmailNotExists = async (email: string) => {
    const user = await this.userRepo.findUserByEmail(email);
    if (user) {
      throw new ConflictError(`User with email ${email} is already exists`);
    }
  };

  public ensureUserWithUsernameNotExists = async (username: string) => {
    const user = await this.userRepo.findUserByUsername(username);
    if (user) {
      throw new ConflictError(
        `User with username ${username} is already exists`,
      );
    }
  };

  public ensureUserWithEmailExists = async (email: string) => {
    const user = await this.userRepo.findUserByEmail(email);
    if (!user) {
      throw new NotFoundError(`User with email ${email} is not exists`);
    }
    return user;
  };

  public ensureUserWithUsernameExists = async (username: string) => {
    const user = await this.userRepo.findUserByUsername(username);
    if (!user) {
      throw new NotFoundError(`User with username ${username} is not exists`);
    }
    return user;
  };

  public ensureUserWithIdExists = async (id: string): Promise<User> => {
    const user = await this.userRepo.findUserById(id);
    if (!user || user.deletedAt) {
      throw new NotFoundError(
        `User with id ${id} is not exists or account may be deleted`,
      );
    }
    return user;
  };

  public ensureSessionExistsWithSessionId = async (sessionId: string) => {
    const session = await this.userRepo.findSessionBySessionId(sessionId);
    if (!session) {
      throw new NotFoundError(
        `Session with session id ${sessionId} is not exists`,
      );
    }
    return session;
  };
}
