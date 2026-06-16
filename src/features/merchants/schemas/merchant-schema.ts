import { z } from "zod";

export const merchantSchema = z.object({
  merchantName: z.string().min(1, "Merchant name is required"),
  category: z.string().min(1, "Category is required"),
  merchantStatus: z.boolean(),
  fullName: z.string().min(1, "Full name is required"),
  emailAddress: z.string().email("Valid email is required"),
  agreementStartDate: z.string().min(1, "Start date is required"),
  agreementEndDate: z.string().min(1, "End date is required"),
  autoRenewal: z.boolean(),
});

export type MerchantFormData = z.infer<typeof merchantSchema>;
