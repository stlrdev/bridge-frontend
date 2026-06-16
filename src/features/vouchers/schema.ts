import z from "zod";

export const validateVoucherSchema = z.object({
  code: z
    .string()
    .min(6, "Code must be at least 6 characters")
    .max(20, "Code must be at most 20 characters")
    .regex(/^[A-Z0-9]+$/i, "Code must contain only letters and numbers"),
});

export type ValidateVoucherSchema = z.infer<typeof validateVoucherSchema>;
