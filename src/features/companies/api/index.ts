import { ApiResponse, PaginatedResponse } from "@/core/types";
import { Company, CompanyBranding, CompanyListParams } from "../types";
import { get, patch } from "@/core/api/client";

export const companiesApi = {
  list: (params?: CompanyListParams) =>
    get<PaginatedResponse<Company>>("/companies", { params }),
  getById: (id: string) => get<ApiResponse<Company>>(`/companies/${id}`),
  getBranding: (id: string) =>
    get<ApiResponse<CompanyBranding>>(`/companies/${id}/branding`),
  updateBranding: (id: string, payload: Partial<CompanyBranding>) =>
    patch<ApiResponse<CompanyBranding>>(`/companies/${id}/branding`, payload),
};
