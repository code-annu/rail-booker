export interface CreateUserProfileInput {
  userId: string;
  dob: Date;
  gender: string;
  address: string;
}

export interface UpdateUserProfileInput {
  userId: string;
  dob?: Date;
  gender?: string;
  address?: string;
}
