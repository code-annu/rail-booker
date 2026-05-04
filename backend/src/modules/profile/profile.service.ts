import { inject, injectable } from "inversify";
import TYPES from "../../di/inversify.types";
import UserValidator from "../../shared/validator/user.validator";
import ProfileRepository from "./profile.repository";
import ProfileValidator from "../../shared/validator/ProfileValidator";
import { UserProfile } from "./profile.type";
import { CreateUserProfileInput, UpdateUserProfileInput } from "./profile.dto";

@injectable()
export default class ProfileService {
  constructor(
    @inject(TYPES.UserValidator) private readonly userValidator: UserValidator,
    @inject(TYPES.ProfileValidator)
    private readonly profileValidator: ProfileValidator,
    @inject(TYPES.ProfileRepository)
    private readonly profileRepo: ProfileRepository,
  ) {}

  public createProfile = async (
    input: CreateUserProfileInput,
  ): Promise<UserProfile> => {
    const { userId, dob, gender, address } = input;
    await this.userValidator.ensureUserWithIdExists(userId);
    await this.profileValidator.ensureProfileNotExistsForUser(userId);
    return await this.profileRepo.create({ userId, dob, gender, address });
  };

  public getProfile = async (userId: string): Promise<UserProfile> => {
    return await this.profileValidator.ensureProfileExistsForUser(userId);
  };

  public updateProfile = async (
    input: UpdateUserProfileInput,
  ): Promise<UserProfile> => {
    const { userId, dob, gender, address } = input;
    await this.userValidator.ensureUserWithIdExists(userId);
    const profile =
      await this.profileValidator.ensureProfileExistsForUser(userId);

    return await this.profileRepo.update(userId, {
      dob: dob || profile.dob,
      gender: gender || profile.gender,
      address: address || profile.address,
    });
  };

  public deleteProfile = async (userId: string): Promise<void> => {
    await this.userValidator.ensureUserWithIdExists(userId);
    await this.profileValidator.ensureProfileExistsForUser(userId);
    await this.profileRepo.delete(userId);
  };
}
