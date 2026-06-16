import * as z from "zod";

export const companySchema = z
  .object({
    companyName: z
      .string()
      .min(1, "Company name is required")
      .max(100, "Company name must be less than 100 characters"),
    companyStatus: z.enum(["ACTIVE", "INACTIVE"]),
    accountTier: z
      .string()
      .min(1, "Account tier is required")
      .max(50, "Account tier must be less than 50 characters"),
    monthlyPlatformFee: z
      .string()
      .min(1, "Monthly platform fee is required")
      .regex(/^\$?\s*\d+(\.\d{2})?$/, "Invalid fee format"),
    estimatedEmployeeCount: z
      .number()
      .min(10, "Must be at least 10 employees")
      .max(10000, "Must be less than 10,000 employees"),
    contractValidityStart: z.string().min(1, "Start date is required"),
    contractValidityEnd: z.string().min(1, "End date is required"),
    customMerchantAccess: z.array(z.string()),
  })
  .refine(
    (data) => {
      const start = new Date(data.contractValidityStart);
      const end = new Date(data.contractValidityEnd);
      return end > start;
    },
    {
      message: "End date must be after start date",
      path: ["contractValidityEnd"],
    },
  );

export type CompanyFormData = z.infer<typeof companySchema>;
