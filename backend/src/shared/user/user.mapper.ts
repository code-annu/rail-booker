import {
  User as PrismaUser,
  Session as PrismaSession,
} from "../../generated/prisma";
import { Session, User, UserStatus } from "../user/user.types";

type SessionWithUser = PrismaSession & { user: PrismaUser };

export default abstract class UserMapper {
  public static toUserType(user: PrismaUser): User {
    return {
      id: user.id.toString(),
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      passwordHash: user.password_hash,
      phone: user.phone,
      status: user.status as UserStatus,
      isVerified: user.is_verified,
      deletedAt: user.deleted_at,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }

  public static toSessionType(session: SessionWithUser): Session {
    return {
      id: session.id.toString(),
      user: UserMapper.toUserType(session.user),
      sessionId: session.session_id,
      ipAddress: session.ip_address,
      lastSeen: session.last_seen,
      expiresAt: session.expires_at,
      createdAt: session.created_at,
    };
  }
}
