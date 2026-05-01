import { PrismaClient } from "@prisma/client/extension";
import { injectable } from "inversify";
import { prisma } from "../../config/prisma.client";
import {
  UserCreate,
  User,
  UserUpdate,
  Session,
  SessionUpdate,
  SessionCreate,
} from "./user.types";
import UserMapper from "./user.mapper";

@injectable()
export default class UserRepository {
  private readonly db: PrismaClient;

  constructor() {
    this.db = prisma;
  }

  public createUser = async (data: UserCreate): Promise<User> => {
    const {
      fullname,
      email,
      passwordHash,
      phone,
      status,
      isVerified,
      username,
    } = data;
    const user = await this.db.user.create({
      data: {
        fullname: fullname,
        username: username,
        email: email,
        password_hash: passwordHash,
        phone,
        status,
        is_verified: isVerified,
      },
    });

    return UserMapper.toUserType(user);
  };

  public findUserByEmail = async (email: string): Promise<User | null> => {
    const user = await this.db.user.findUnique({
      where: { email: email },
    });
    return user ? UserMapper.toUserType(user) : null;
  };

  public findUserByUsername = async (
    username: string,
  ): Promise<User | null> => {
    const user = await this.db.user.findUnique({
      where: { username: username },
    });
    return user ? UserMapper.toUserType(user) : null;
  };

  public updateUser = async (
    id: string,
    updates: UserUpdate,
  ): Promise<User> => {
    const { fullname, isVerified } = updates;
    const user = await this.db.user.update({
      where: { id: id },
      data: {
        fullname: fullname,
        is_verified: isVerified,
      },
    });

    return UserMapper.toUserType(user);
  };

  public deleteUser = async (id: string): Promise<User> => {
    const user = await this.db.user.update({
      where: { id: id },
      data: { deleted_at: new Date() },
    });

    return UserMapper.toUserType(user);
  };

  public findUserById = async (id: string): Promise<User | null> => {
    const user = await this.db.user.findUnique({ where: { id: id } });
    return user ? UserMapper.toUserType(user) : null;
  };

  public createSession = async (data: SessionCreate): Promise<Session> => {
    const { sessionId, userId, ipAddress, lastSeen, expiresAt } = data;
    const session = await this.db.session.create({
      data: {
        session_id: sessionId,
        user_id: userId,
        ip_address: ipAddress,
        last_seen: lastSeen,
        expires_at: expiresAt,
      },
      include: { user: true },
    });
    return UserMapper.toSessionType(session);
  };

  public findSessionBySessionId = async (
    sessionId: string,
  ): Promise<Session | null> => {
    const session = await this.db.session.findUnique({
      where: { session_id: sessionId },
      include: { user: true },
    });
    return session ? UserMapper.toSessionType(session) : null;
  };

  public updateSession = async (
    id: string,
    updates: SessionUpdate,
  ): Promise<Session> => {
    const session = await this.db.session.update({
      where: { id },
      data: {
        last_seen: updates.lastSeen,
      },
      include: { user: true },
    });
    return UserMapper.toSessionType(session);
  };

  public deleteSessionBySessionId = async (
    sessionId: string,
  ): Promise<void> => {
    await this.db.session.delete({
      where: { session_id: sessionId },
    });
  };

  public deleteSessionByUserId = async (userId: string) => {
    await this.db.session.deleteMany({
      where: { user_id: userId },
    });
  };
}
