import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import container from "../../di/inversify.config";
import UserRepository from "../user/user.repository";
import TYPES from "../../di/inversify.types";
import { UnauthorizedError } from "../error/errors";
import ErrorCode from "../error/ErrorCodes";

const MAX_IDLE = 5 * 60 * 1000; // 5 mins inactivity
const userRepo = container.get<UserRepository>(TYPES.UserRepository);

export interface AuthRequest extends Request {
  auth?: { userId: string; email: string };
}

export default async function validateSession(
  req: AuthRequest,
  _: Response,
  next: NextFunction,
) {
  const sid = req.cookies["rail.sid"];

  if (!sid) {
    throw new UnauthorizedError(
      ErrorCode.MISSING_SESSION_ID,
      "Session id missing",
    );
  }

  const session = await userRepo.findSessionBySessionId(sid);

  if (!session) {
    throw new UnauthorizedError(
      ErrorCode.SESSION_NOT_FOUND,
      "Session not found",
    );
  }

  // Check inactivity
  if (Date.now() - session.lastSeen.getTime() > MAX_IDLE) {
    throw new UnauthorizedError(ErrorCode.SESSION_EXPIRED, "Session expired");
  }

  // Check IP
  if (session.ipAddress !== req.ip) {
    throw new UnauthorizedError(ErrorCode.IP_CHANGED, "Ip changed");
  }

  // Check Browser fingerprint
  const currentUA = crypto
    .createHash("sha256")
    .update(req.headers["user-agent"] || "")
    .digest("hex");

  if (currentUA !== session.userAgentHash) {
    throw new UnauthorizedError(
      ErrorCode.BROWSER_MISMATCH,
      "Browser/Device mismatch",
    );
  }

  // Update last seen
  session.lastSeen = new Date();

  await userRepo.updateSession(sid, session);

  req.auth = { userId: session.user.id, email: session.user.email };

  next();
}
