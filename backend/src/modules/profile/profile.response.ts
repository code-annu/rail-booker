import { UserProfile } from "./profile.type";

export const mapToProfileResponse = (
  userProfile: UserProfile,
  statusCode: number,
  message: string,
) => {
  return {
    message,
    statusCode,
    success: true,
    data: userProfile,
  };
};
