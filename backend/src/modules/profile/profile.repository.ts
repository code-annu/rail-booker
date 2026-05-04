import { injectable } from "inversify";
import { prisma } from "../../config/prisma.client";
import { PrismaClient } from "../../generated/prisma";
import UserProfileMapper from "./profile.mapper";
import {
  UserProfile,
  UserProfileCreate,
  UserProfileUpdate,
} from "./profile.type";


@injectable()
export default class ProfileRepository {
  private readonly db: PrismaClient;

  constructor() {
    this.db = prisma;
  }

  public create = async (data: UserProfileCreate): Promise<UserProfile> => {
    const { userId, dob, gender, address } = data;
    const profile = await this.db.userProfile.create({
      data: {
        id: userId,
        dob,
        gender,
        address,
      },
      include: { user: true },
    });
    return UserProfileMapper.toProfileType(profile);
  };

  public findById = async (id: string): Promise<UserProfile | null> => {
    const profile = await this.db.userProfile.findUnique({
      where: { id },
      include: { user: true },
    });
    return profile ? UserProfileMapper.toProfileType(profile) : null;
  };

  public update = async (
    id: string,
    updates: UserProfileUpdate,
  ): Promise<UserProfile> => {
    const { dob, gender, address } = updates;
    const profile = await this.db.userProfile.update({
      where: { id },
      data: { dob, gender, address },
      include: { user: true },
    });

    return UserProfileMapper.toProfileType(profile);
  };

  public delete = async (id: string) => {
    await this.db.userProfile.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  };
}
