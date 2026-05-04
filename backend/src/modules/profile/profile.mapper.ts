import { UserProfile } from "./profile.type";

import {
  UserProfile as PrismaUserProfile,
  User as PrismaUser,
} from "../../generated/prisma";

type ProfileWithUser = PrismaUserProfile & { user: PrismaUser };

export default abstract class UserProfileMapper {
  public static toProfileType(profile: ProfileWithUser): UserProfile {
    const { user, id, dob, address, gender, created_at, updated_at } = profile;
    const { username, fullname, email, phone, is_verified, deleted_at } = user;
    return {
      id,
      dob,
      user: {
        id,
        username,
        fullname,
        email,
        phone,
        isVerified: is_verified,
      },
      gender,
      deletedAt: deleted_at,
      address,
      createdAt: created_at,
      updatedAt: updated_at,
    };
  }
}
