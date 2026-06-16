import { get, post, put, del } from "@/core/api/client";
import { PaginatedResponse } from "@/core/types";
import {
  Voucher,
  VoucherBatch,
  VoucherRedemption,
  VouchersListParams,
  CreateVoucherPayload,
  ClaimVoucherPayload,
  RedeemVoucherPayload,
  CreateVoucherBatchPayload,
  AssignVoucherPayload,
  ValidationResult,
} from "../types";

// ── EMPLOYEE ──────────────────────────────────────────────────────────────────

export const vouchersApi = {
  // My claimed/assigned vouchers wallet
  list: (params?: VouchersListParams) =>
    get<PaginatedResponse<Voucher>>("/vouchers/my-vouchers/", { params }),

  getById: (id: string) =>
    get<Voucher>(`/vouchers/my-vouchers/${id}/`),

  getQrCode: (id: string) =>
    get<{ qrCode: string; qrCodeUrl: string }>(`/vouchers/my-vouchers/${id}/qr-code/`),

  // Discover publicly available vouchers
  discover: (params?: VouchersListParams) =>
    get<PaginatedResponse<Voucher>>("/vouchers/discover/", { params }),

  // Claim a voucher into the wallet
  claim: (voucherId: string, payload?: ClaimVoucherPayload) =>
    post<Voucher>(`/vouchers/${voucherId}/claim/`, payload),

  // Redemption history
  getHistory: (params?: VouchersListParams) =>
    get<PaginatedResponse<VoucherRedemption>>("/vouchers/redemptions/my-history/", {
      params,
    }),

  // ── MERCHANT / STAFF ──────────────────────────────────────────────────────

  // Verify voucher by code (returns validation result)
  verify: (code: string) =>
    post<ValidationResult>("/vouchers/verify/", { code }),

  // Validate via QR scan
  validateQr: (qrData: string) =>
    post<ValidationResult>("/vouchers/validate-qr/", { qrData }),

  // Redeem a voucher at point of sale
  redeem: (payload: RedeemVoucherPayload) =>
    post<VoucherRedemption>("/vouchers/redeem/", payload),

  // Search for vouchers
  search: (query: string) =>
    get<PaginatedResponse<Voucher>>("/vouchers/search/", { params: { q: query } }),

  // ── MERCHANT MANAGER ──────────────────────────────────────────────────────

  listMerchantVouchers: (merchantId: string, params?: VouchersListParams) =>
    get<PaginatedResponse<Voucher>>(`/vouchers/merchants/${merchantId}/vouchers/`, {
      params,
    }),

  createVoucher: (merchantId: string, payload: CreateVoucherPayload) =>
    post<Voucher>(`/vouchers/merchants/${merchantId}/vouchers/`, payload),

  updateVoucher: (merchantId: string, voucherId: string, payload: Partial<CreateVoucherPayload>) =>
    put<Voucher>(`/vouchers/merchants/${merchantId}/vouchers/${voucherId}/`, payload),

  activateVoucher: (merchantId: string, voucherId: string) =>
    post<Voucher>(`/vouchers/merchants/${merchantId}/vouchers/${voucherId}/activate/`),

  suspendVoucher: (merchantId: string, voucherId: string) =>
    post<Voucher>(`/vouchers/merchants/${merchantId}/vouchers/${voucherId}/suspend/`),

  assignVoucher: (merchantId: string, voucherId: string, payload: AssignVoucherPayload) =>
    post<{ assigned: number }>(`/vouchers/merchants/${merchantId}/vouchers/${voucherId}/assign/`, payload),

  getVoucherAssignments: (merchantId: string, voucherId: string) =>
    get<PaginatedResponse<{ id: string; customerId: string; customerEmail: string; assignedAt: string }>>(
      `/vouchers/merchants/${merchantId}/vouchers/${voucherId}/assignments/`,
    ),

  // Batches
  listBatches: (merchantId: string) =>
    get<PaginatedResponse<VoucherBatch>>(`/vouchers/merchants/${merchantId}/vouchers/batches/`),

  createBatch: (merchantId: string, payload: CreateVoucherBatchPayload) =>
    post<VoucherBatch>(`/vouchers/merchants/${merchantId}/vouchers/batches/`, payload),

  generateBatch: (merchantId: string, batchId: string) =>
    post<VoucherBatch>(`/vouchers/merchants/${merchantId}/vouchers/batches/${batchId}/generate/`),

  getMerchantRedemptions: (merchantId: string, params?: VouchersListParams) =>
    get<PaginatedResponse<VoucherRedemption>>(`/vouchers/merchants/${merchantId}/redemptions/`, {
      params,
    }),

  getVoucherRedemptions: (merchantId: string, voucherId: string) =>
    get<PaginatedResponse<VoucherRedemption>>(
      `/vouchers/merchants/${merchantId}/vouchers/${voucherId}/redemptions/`,
    ),

  // ── STLR ADMIN ────────────────────────────────────────────────────────────

  adminListAll: (params?: VouchersListParams) =>
    get<PaginatedResponse<Voucher>>("/vouchers/admin/all/", { params }),

  adminGetById: (voucherId: string) =>
    get<Voucher>(`/vouchers/admin/${voucherId}/`),

  adminDisable: (voucherId: string) =>
    post<Voucher>(`/vouchers/admin/${voucherId}/disable/`),
};
