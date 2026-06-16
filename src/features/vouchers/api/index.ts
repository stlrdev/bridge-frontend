import { get, post } from "@/core/api/client";
import { Voucher, VouchersListParams } from "../types";
import { ApiResponse, PaginatedResponse } from "@/core/types";

export const vouchersApi = {
  list: (params?: VouchersListParams) =>
    get<PaginatedResponse<Voucher>>("/vouchers", { params }),
  generate: (offerId: string) =>
    post<ApiResponse<Voucher>>("/vouchers/generate", { offerId }),
  validate: (code: string) =>
    get<ApiResponse<Voucher>>("/vouchers/validate", { params: { code } }),
  getHistory: (params?: VouchersListParams) =>
    get<ApiResponse<Voucher>>("/vouchers/history", { params }),
};
