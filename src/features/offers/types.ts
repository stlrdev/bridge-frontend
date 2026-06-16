import { PaginationParams } from "@/core/types";

export type CampaignStatus =
  | "draft"
  | "scheduled"
  | "active"
  | "paused"
  | "completed"
  | "cancelled";

export interface Campaign {
  id: string;
  name: string;
  description: string | null;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  totalBudget: string | null;
  spentBudget: string;
  budgetRemaining: string | null;
  maxVouchers: number | null;
  voucherCount: number;
  targetingRules: Record<string, unknown>;
  merchantId: string;
  merchantName: string | null;
  createdByEmail: string | null;
  isExpired: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignStats {
  totalRedemptions: number;
  totalDiscountGiven: string;
  uniqueCustomers: number;
  vouchersGenerated: number;
  vouchersRedeemed: number;
  redemptionRate: number;
}

export interface CreateCampaignPayload {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  totalBudget?: string;
  maxVouchers?: number;
  targetingRules?: Record<string, unknown>;
}

export interface UpdateCampaignPayload extends Partial<CreateCampaignPayload> {}

export interface CampaignsListParams extends PaginationParams {
  status?: CampaignStatus;
  search?: string;
}

// Thin alias used by the employee-facing (client) views.
// Maps to backend Vouchers that are enabled for the client org.
export interface Offer {
  id: string;
  merchantId: string;
  merchantName?: string;
  title: string;
  description: string;
  discountValue: number;
  discountType: "PERCENTAGE" | "FIXED";
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  maxRedemptions?: number;
  currentRedemptions?: number;
}
