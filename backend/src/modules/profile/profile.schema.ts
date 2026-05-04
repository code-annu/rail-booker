import { z } from "zod";

export const createProfileSchema = z.object({
  dob: z
    .string({ error: "Date of birth is required" })
    .date("Invalid date format, expected YYYY-MM-DD"),
  gender: z
    .string({ error: "Gender is required" })
    .min(1, "Gender is required")
    .max(20, "Gender must be at most 20 characters"),
  address: z
    .string({ error: "Address is required" })
    .min(3, "Address must be at least 3 characters")
    .max(255, "Address must be at most 255 characters"),
});

export const updateProfileSchema = z.object({
  dob: z
    .string()
    .date("Invalid date format, expected YYYY-MM-DD")
    .optional(),
  gender: z
    .string()
    .min(1, "Gender is required")
    .max(20, "Gender must be at most 20 characters")
    .optional(),
  address: z
    .string()
    .min(3, "Address must be at least 3 characters")
    .max(255, "Address must be at most 255 characters")
    .optional(),
});
