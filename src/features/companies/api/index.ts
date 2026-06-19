import { get, post } from "@/core/api/client";
import { PaginatedResponse } from "@/core/types";
import {
  ClientEmployee,
  ClientOrganization,
  CompanyListParams,
  CreateClientOrganizationPayload,
} from "../types";
import { VoucherRedemption } from "@/features/vouchers/types";

// ── STLR ADMIN ────────────────────────────────────────────────────────────────

export const companiesApi = {
  // Platform-wide list of client organisations (STLR_ADMIN)
  list: (params?: CompanyListParams) =>
    get<PaginatedResponse<ClientOrganization>>("/clients/", { params }),

  getById: (companyId: string) =>
    get<ClientOrganization>(`/clients/${companyId}/`),

  create: (payload: CreateClientOrganizationPayload) =>
    post<ClientOrganization>("/clients/", payload),

  // ── COMPANY ADMIN ──────────────────────────────────────────────────────────

  getMe: () =>
    get<ClientOrganization>("/clients/me/"),

  listEmployees: (params?: { page?: number; pageSize?: number }) =>
    get<PaginatedResponse<ClientEmployee>>("/clients/me/employees/", { params }),

  getEmployeeRedemptions: (customerId: string) =>
    get<PaginatedResponse<VoucherRedemption>>(
      `/clients/me/employees/${customerId}/redemptions/`,
    ),

  getOrgRedemptions: (params?: { page?: number; pageSize?: number }) =>
    get<PaginatedResponse<VoucherRedemption>>("/clients/me/redemptions/", {
      params,
    }),
};
