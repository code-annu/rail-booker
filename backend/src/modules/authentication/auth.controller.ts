import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import TYPES from "../../di/inversify.types";
import AuthService from "./auth.service";
import { mapToAuthResponse } from "./auth.response";
import catchAsync from "../../shared/error/async.catch";

@injectable()
export default class AuthController {
  constructor(
    @inject(TYPES.AuthService)
    private readonly authService: AuthService,
  ) {}

  public signup = catchAsync(async (req: Request, res: Response) => {
    const { fullname, email, password, phone, username } = req.body;
    const result = await this.authService.signup({
      fullname,
      email,
      password,
      ipAddress: req.ip?.toString() || "",
      phone,
      username,
    });
    const response = mapToAuthResponse(
      result,
      201,
      "User registered successfully",
    );
    res.status(201).json(response);
  });

  public login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.authService.login({
      email,
      password,
      ipAddress: req.ip?.toString() || "",
    });
    const response = mapToAuthResponse(result, 200, "Login successful");
    res.status(200).json(response);
  });

  public logout = catchAsync(async (req: Request, res: Response) => {
    const { sessionId } = req.body;
    await this.authService.logout(sessionId);
    res.status(200).json({
      message: "Logged out successfully",
      code: 200,
      success: true,
    });
  });
}
