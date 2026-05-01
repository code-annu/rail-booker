import jwt from "jsonwebtoken";
import { StringValue } from "ms";
import { ENV } from "../../config/constants";

export interface JWTPayload {
  userId: string;
  email: string;
}

const ACCESS_TOKEN_SECRET = ENV.JWT_ACCESS_SECRET;
const ACCESS_TOKEN_EXPIRE = (ENV.JWT_ACCESS_EXPIRES_IN || "1m") as StringValue;

const REFRESH_TOKEN_SECRET = ENV.JWT_REFRESH_SECRET;
const REFRESH_TOKEN_EXPIRE = (ENV.JWT_REFRESH_EXPIRES_IN ||
  "15d") as StringValue;

const generateAccessToken = (payload: JWTPayload): string => {
  const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRE,
  });
  return token;
};

const generateRefreshToken = (payload: JWTPayload): string => {
  const token = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRE,
  });
  return token;
};

export const generateTokens = (
  payload: JWTPayload,
): { accessToken: string; refreshToken: string } => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string): JWTPayload => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as JWTPayload;
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as JWTPayload;
};
