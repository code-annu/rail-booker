import { inject, injectable } from "inversify";
import { Response } from "express";
import TYPES from "../../di/inversify.types";
import ProfileService from "./profile.service";
import { mapToProfileResponse } from "./profile.response";
import catchAsync from "../../shared/error/async.catch";
import { AuthRequest } from "../../shared/middlewares/session-validator.middleware";
import { UpdateUserProfileInput } from "./profile.dto";

@injectable()
export default class ProfileController {
  constructor(
    @inject(TYPES.ProfileService)
    private readonly profileService: ProfileService,
  ) {}

  public createProfile = catchAsync(async (req: AuthRequest, res: Response) => {
    const userId = req.auth!.userId;
    const { dob, gender, address } = req.body;
    const profile = await this.profileService.createProfile({
      userId,
      dob: new Date(dob),
      gender,
      address,
    });
    const response = mapToProfileResponse(
      profile,
      201,
      "Profile created successfully",
    );
    res.status(201).json(response);
  });

  public getProfile = catchAsync(async (req: AuthRequest, res: Response) => {
    const userId = req.auth!.userId;
    console.log(userId)
    const profile = await this.profileService.getProfile(userId);
    const response = mapToProfileResponse(
      profile,
      200,
      "Profile fetched successfully",
    );
    res.status(200).json(response);
  });

  public updateProfile = catchAsync(async (req: AuthRequest, res: Response) => {
    const userId = req.auth!.userId;
    const { dob, gender, address } = req.body;
    const input: UpdateUserProfileInput = { userId };
    if (dob) input.dob = new Date(dob);
    if (gender) input.gender = gender;
    if (address) input.address = address;
    const profile = await this.profileService.updateProfile(input);
    const response = mapToProfileResponse(
      profile,
      200,
      "Profile updated successfully",
    );
    res.status(200).json(response);
  });

  public deleteProfile = catchAsync(async (req: AuthRequest, res: Response) => {
    const userId = req.auth!.userId;
    await this.profileService.deleteProfile(userId);
    res.status(200).json({
      message: "Profile deleted successfully",
      statusCode: 200,
      success: true,
    });
  });
}
