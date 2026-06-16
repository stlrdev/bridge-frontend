import { z } from "zod";

/**
 * Login validation schema
 */
export const loginValidationSchema = z.object({
  email: z.email("Please enter a valid email.").nonempty("Email is required."),
  password: z.string().min(1, "Password is required."),
});

export type LoginValidationSchema = z.infer<typeof loginValidationSchema>;
