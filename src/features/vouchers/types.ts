export type VoucherStatus = "ACTIVE" | "REDEEMED" | "EXPIRED" | "CANCELLED";

export interface Voucher {
  id: string;
  code: string;
  offerId: string;
  offerTitle?: string;
  merchantId: string;
  merchantName?: string;
  employeeId: string;
  status: VoucherStatus;
  discountValue: number;
  discountType: "PERCENTAGE" | "FIXED";
  generatedAt: string;
  expiresAt: string;
  redeemedAt?: string;
}

export interface ValidationResult {
  isValid: boolean;
  voucher?: Voucher;
  message: string;
  alreadyRedeemed?: boolean;
}

export interface VouchersListParams {
  page?: number;
  pageSize?: number;
  status?: VoucherStatus;
  search?: string;
}
