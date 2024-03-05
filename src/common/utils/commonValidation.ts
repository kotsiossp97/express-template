import { z } from "zod";

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !isNaN(Number(data)), "ID must be a numeric value")
    .transform(Number)
    .refine((num) => num > 0, "ID must be a positive number")
    .or(z.number().refine((num) => num > 0, "ID must be a positive number")),
  // ... other common validations
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
};
