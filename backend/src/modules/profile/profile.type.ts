interface User {
  readonly id: string;
  readonly username: string;
  fullname: string;
  email: string;
  phone: string;
  isVerified: boolean;
}

export interface UserProfile {
  readonly id: string;
  dob: Date;
  user: User;
  gender: string;
  address: string;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfileCreate{
    userId: string;
    dob: Date;
    gender: string;
    address: string;
}

export interface UserProfileUpdate{
  dob: Date;
  gender: string;
  address: string;
}
