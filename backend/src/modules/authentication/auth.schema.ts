import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string({ error: "username is required" })
    .min(3, "username must be at least 3 characters")
    .max(50, "username must be at most 50 characters"),
  fullname: z
    .string({ error: "Full name is required" })
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be at most 100 characters"),
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be at most 128 characters"),
  phone: z
    .string({ error: "Phone number is required" })
    .length(10, "Phone number must be 10 digits")
    .regex(/^[6-9]\d{9}$/, "Invalid phone number"),
});

export const loginSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string({ error: "Password is required" })
    .min(1, "Password is required"),
});

export const logoutSchema = z.object({
  sessionId: z
    .string({ error: "Session id is required" })
    .min(1, "Session id is required"),
});
