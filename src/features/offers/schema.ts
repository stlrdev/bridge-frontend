import { z } from "zod";
import { type DateRange } from "react-day-picker";

// Date range schema for form validation
const dateRangeSchema = z
  .object({
    from: z.date().optional(),
    to: z.date().optional(),
  })
  .refine((data) => data.from && data.to, {
    message: "Both start and end dates are required",
  })
  .refine((data) => data.from && data.to && data.to >= data.from, {
    message: "End date must be after or equal to start date",
  }) as z.ZodType<DateRange>;

export const createOfferSchema = z
  .object({
    merchantId: z.string().min(1, "Merchant is required."),
    title: z
      .string()
      .min(2, "Title must be at least 2 characters long.")
      .max(100, "Title must be at most 100 characters long."),
    description: z
      .string()
      .min(2, "Description must be at least 2 characters long.")
      .max(300, "Description must be at most 300 characters long."),
    discountValue: z.number().min(0, "Discount value must be at least 0."),
    discountType: z.enum(["PERCENTAGE", "FIXED"]),
    tier: z.enum(["BASIC", "STANDARD", "PREMIUM", "EXCLUSIVE"]),
    // Add date range field for the form
    validityRange: dateRangeSchema,
    // Keep string fields for API compatibility (will be derived from date range)
    validFrom: z.string().min(1, "Valid from is required."),
    validUntil: z.string().min(1, "Valid until is required."),
    maxRedemptions: z.number().positive().optional(),
    voucherType: z.enum(["ONE_TIME_USE", "REUSABLE"]),
  })
  .refine((d) => !(d.discountType === "PERCENTAGE" && d.discountValue > 100), {
    message: "Percentage discount must be less than or equal to 100",
    path: ["discountValue"],
  });

export type CreateOfferFormValues = z.infer<typeof createOfferSchema>;
