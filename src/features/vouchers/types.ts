import { PaginationParams } from "@/core/types";

export type VoucherType =
  | "percentage"
  | "fixed_amount"
  | "free_item"
  | "bogo"
  | "points_multiplier";

export type VoucherStatus =
  | "draft"
  | "active"
  | "redeemed"
  | "expired"
  | "suspended";

export type OrderType = "takeaway" | "dine_in" | "both";

export type VerificationMethod = "qr_scan" | "manual_entry" | "api";

export type VoucherBatchStatus = "pending" | "generating" | "completed" | "failed";

export interface Voucher {
  id: string;
  code: string;
  type: VoucherType;
  value: string;
  status: VoucherStatus;
  validFrom: string;
  validUntil: string;
  maxRedemptions: number | null;
  maxRedemptionsPerUser: number | null;
  currentRedemptions: number;
  remainingRedemptions: number | null;
  minimumPurchaseAmount: string | null;
  maximumDiscountAmount: string | null;
  isPublic: boolean;
  description: string | null;
  termsAndConditions: string | null;
  qrCode: string | null;
  qrCodeUrl: string | null;
  orderType: OrderType;
  applicableBranchIds: string[];
  applicableBranchNames: string[];
  merchantId: string;
  merchantName: string | null;
  campaignId: string | null;
  campaignName: string | null;
  batchId: string | null;
  isExpired: boolean;
  isFullyRedeemed: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VoucherBatch {
  id: string;
  name: string;
  prefix: string;
  quantity: number;
  generatedCount: number;
  voucherType: VoucherType;
  voucherValue: string;
  validFrom: string;
  validUntil: string;
  maxRedemptions: number | null;
  maxRedemptionsPerUser: number | null;
  minimumPurchaseAmount: string | null;
  maximumDiscountAmount: string | null;
  status: VoucherBatchStatus;
  errorMessage: string | null;
  description: string | null;
  merchantId: string;
  campaignId: string | null;
  createdAt: string;
}

export interface VoucherRedemption {
  id: string;
  voucherId: string;
  voucherCode: string;
  voucherType: VoucherType;
  customerId: string | null;
  customerEmail: string | null;
  redeemedById: string;
  redeemedByEmail: string;
  redeemedByName: string;
  merchantId: string;
  merchantName: string;
  branchId: string | null;
  branchName: string | null;
  redeemedAt: string;
  discountApplied: string;
  originalOrderValue: string | null;
  verificationMethod: VerificationMethod;
  transactionReference: string | null;
}

export interface ValidationResult {
  isValid: boolean;
  voucher?: Voucher;
  message: string;
  alreadyRedeemed?: boolean;
}

export interface CreateVoucherPayload {
  code?: string;
  type: VoucherType;
  value: string;
  validFrom: string;
  validUntil: string;
  maxRedemptions?: number;
  maxRedemptionsPerUser?: number;
  minimumPurchaseAmount?: string;
  maximumDiscountAmount?: string;
  isPublic?: boolean;
  description?: string;
  termsAndConditions?: string;
  campaignId?: string;
  applicableBranchIds?: string[];
  orderType?: OrderType;
}

export interface ClaimVoucherPayload {
  voucherId: string;
}

export interface RedeemVoucherPayload {
  voucherCode: string;
  customerId?: string;
  orderValue?: string;
  branchId?: string;
  verificationMethod: VerificationMethod;
  transactionReference?: string;
}

export interface CreateVoucherBatchPayload {
  name: string;
  prefix: string;
  quantity: number;
  voucherType: VoucherType;
  voucherValue: string;
  validFrom: string;
  validUntil: string;
  maxRedemptions?: number;
  maxRedemptionsPerUser?: number;
  minimumPurchaseAmount?: string;
  maximumDiscountAmount?: string;
  description?: string;
  termsAndConditions?: string;
  campaignId?: string;
}

export interface AssignVoucherPayload {
  customerIds: string[];
}

export interface VouchersListParams extends PaginationParams {
  status?: VoucherStatus;
  search?: string;
}
