import { Router } from "express";
import TYPES from "../../di/inversify.types";
import ProfileController from "./profile.controller";
import { createProfileSchema, updateProfileSchema } from "./profile.schema";
import container from "../../di/inversify.config";
import { validateRequestBody } from "../../shared/middlewares/validate.request.middleware";
import validateSession from "../../shared/middlewares/session-validator.middleware";

const profileRouter = Router();

const profileController = container.get<ProfileController>(
  TYPES.ProfileController,
);

profileRouter.use(validateSession);

profileRouter.post(
  "/",
  validateRequestBody(createProfileSchema),
  profileController.createProfile,
);

profileRouter.get("/", profileController.getProfile);

profileRouter.patch(
  "/",
  validateRequestBody(updateProfileSchema),
  profileController.updateProfile,
);

profileRouter.delete("/", profileController.deleteProfile);

export default profileRouter;
