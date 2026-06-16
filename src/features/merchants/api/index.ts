import { get, post, put } from "@/core/api/client";
import { PaginatedResponse } from "@/core/types";
import {
  Branch,
  CreateBranchPayload,
  CreateMerchantPayload,
  Merchant,
  MerchantsListParams,
} from "../types";

// ── STLR ADMIN ────────────────────────────────────────────────────────────────

export const merchantsApi = {
  list: (params?: MerchantsListParams) =>
    get<PaginatedResponse<Merchant>>("/merchants/", { params }),

  getById: (merchantId: string) =>
    get<Merchant>(`/merchants/${merchantId}/`),

  create: (payload: CreateMerchantPayload) =>
    post<Merchant>("/merchants/", payload),

  update: (merchantId: string, payload: Partial<CreateMerchantPayload>) =>
    put<Merchant>(`/merchants/${merchantId}/`, payload),

  activate: (merchantId: string) =>
    post<Merchant>(`/merchants/${merchantId}/activate/`),

  suspend: (merchantId: string) =>
    post<Merchant>(`/merchants/${merchantId}/suspend/`),

  // Branches
  listBranches: (merchantId: string) =>
    get<PaginatedResponse<Branch>>(`/merchants/${merchantId}/branches/`),

  createBranch: (merchantId: string, payload: CreateBranchPayload) =>
    post<Branch>(`/merchants/${merchantId}/branches/`, payload),

  updateBranch: (merchantId: string, branchId: string, payload: Partial<CreateBranchPayload>) =>
    put<Branch>(`/merchants/${merchantId}/branches/${branchId}/`, payload),
};

// ── COMPANY ADMIN (org-whitelisted merchants) ─────────────────────────────────

export const orgMerchantsApi = {
  list: () =>
    get<PaginatedResponse<Merchant>>("/clients/me/merchants/"),

  enable: (merchantId: string) =>
    post<void>(`/clients/me/merchants/${merchantId}/enable/`),

  disable: (merchantId: string) =>
    post<void>(`/clients/me/merchants/${merchantId}/disable/`),
};
