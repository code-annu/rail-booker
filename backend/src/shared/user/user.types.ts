export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface User {
  readonly id: string;
  readonly username: string;
  fullname: string;
  email: string;
  passwordHash: string;
  phone: string;
  status: UserStatus;
  isVerified: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreate {
  username: string;
  fullname: string;
  email: string;
  passwordHash: string;
  phone: string;
  status: UserStatus;
  isVerified: boolean;
}

export interface UserUpdate {
  username: string;
  fullname: string;
  phone: string;
  isVerified: boolean;
}

export interface Session {
  readonly id: string;
  readonly sessionId: string;
  user: User;
  ipAddress: string;
  lastSeen: Date;
  expiresAt: Date;
  createdAt: Date;
}

export interface SessionCreate {
  userId: string;
  sessionId: string;
  ipAddress: string;
  lastSeen: Date;
  expiresAt: Date;
}

export interface SessionUpdate {
  lastSeen: Date;
}
