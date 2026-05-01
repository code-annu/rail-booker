import { Router } from "express";
import TYPES from "../../di/inversify.types";
import AuthController from "./auth.controller";
import { signupSchema, loginSchema, logoutSchema } from "./auth.schema";
import container from "../../di/inversify.config";
import { validateRequestBody } from "../../shared/middlewares/validate.request.middleware";

const authRouter = Router();

const authController = container.get<AuthController>(TYPES.AuthController);

authRouter.post(
  "/signup",
  validateRequestBody(signupSchema),
  authController.signup,
);
authRouter.post(
  "/login",
  validateRequestBody(loginSchema),
  authController.login,
);

authRouter.post(
  "/logout",
  validateRequestBody(logoutSchema),
  authController.logout,
);

export default authRouter;
