import { Session, User } from "../../shared/user/user.types";

export interface SignupUserInput {
  fullname: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  ipAddress: string;
  userAgent: string;
}

export interface LoginInput {
  email: string;
  password: string;
  ipAddress: string;
  userAgent: string;
}

export interface UserWithSession {
  user: User;
  session: Session;
}
