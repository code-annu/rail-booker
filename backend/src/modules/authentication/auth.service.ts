import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import { LoginInput, SignupUserInput, UserWithSession } from "./auth.dto";
import * as bcrypt from "bcrypt";
import AuthValidator from "../../shared/validator/user.validator";
import { NotFoundError, UnauthorizedError } from "../../shared/error/errors";
import { generateSessionId } from "../../shared/util/session.util";
import UserRepository from "../../shared/user/user.repository";
import { UserStatus } from "../../shared/user/user.types";
import ErrorCode from "../../shared/error/ErrorCodes";
import crypto from "crypto";

@injectable()
export default class AuthService {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepo: UserRepository,
    @inject(TYPES.UserValidator)
    private readonly authValidator: AuthValidator,
  ) {}

  public signup = async (input: SignupUserInput): Promise<UserWithSession> => {
    const { email, password, fullname, phone, ipAddress, username, userAgent } =
      input;
    await this.authValidator.ensureUserWithEmailNotExists(email);
    await this.authValidator.ensureUserWithUsernameNotExists(username);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepo.createUser({
      fullname,
      email,
      username,
      passwordHash: hashedPassword,
      phone: phone,
      isVerified: true,
      status: UserStatus.ACTIVE,
    });

    const sessionId = generateSessionId();

    const session = await this.userRepo.createSession({
      userId: user.id,
      sessionId: sessionId,
      ipAddress: ipAddress,
      userAgentHash: crypto
        .createHash("sha256")
        .update(userAgent)
        .digest("hex"),
      lastSeen: new Date(),
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    });

    return { user, session };
  };

  public login = async (input: LoginInput): Promise<UserWithSession> => {
    const { email, password, ipAddress, userAgent } = input;
    const user = await this.userRepo.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedError(
        ErrorCode.INVALID_CREDENTIALS,
        "Invalid authentication credentials",
      );
    }
    if (user.deletedAt || user.status !== UserStatus.ACTIVE) {
      throw new NotFoundError(
        ErrorCode.USER_NOT_FOUND,
        "User not found. Your account may be deleted or inactive.",
      );
    }
    await this.userRepo.deleteSessionByUserId(user.id);
    const sessionId = generateSessionId();

    const session = await this.userRepo.createSession({
      userId: user.id,
      sessionId: sessionId,
      ipAddress: ipAddress,
      userAgentHash: crypto
        .createHash("sha256")
        .update(userAgent)
        .digest("hex"),
      lastSeen: new Date(),
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    });

    return { user, session };
  };

  public logout = async (sessionId: string) => {
    await this.authValidator.ensureSessionExistsWithSessionId(sessionId);
    await this.userRepo.deleteSessionBySessionId(sessionId);
  };
}
