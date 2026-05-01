import { UserWithSession } from "./auth.dto";

export const mapToAuthResponse = (
  userWithSession: UserWithSession,
  code: number,
  message: string,
) => {
  const { user, session } = userWithSession;
  return {
    message,
    code,
    success: true,
    data: {
      user: {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        isVerified: user.isVerified,
        phone: user.phone,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      session: {
        id: session.id,
        sessionId: session.sessionId,
        ipAddress: session.ipAddress,
        lastSeen: session.lastSeen,
        expiresAt: session.expiresAt,
        createdAt: session.createdAt,
      },
    },
  };
};
