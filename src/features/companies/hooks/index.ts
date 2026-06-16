import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ClientOrganization,
  CompanyListParams,
  CreateClientOrganizationPayload,
} from "../types";
import { companiesApi } from "../api";

export const companyKeys = {
  all: ["companies"] as const,
  lists: () => [...companyKeys.all, "list"] as const,
  list: (params?: CompanyListParams) => [...companyKeys.lists(), params] as const,
  me: () => [...companyKeys.all, "me"] as const,
  employees: () => [...companyKeys.all, "employees"] as const,
  employeeRedemptions: (customerId: string) =>
    [...companyKeys.all, "employee-redemptions", customerId] as const,
  orgRedemptions: () => [...companyKeys.all, "org-redemptions"] as const,
};

// ── STLR ADMIN ────────────────────────────────────────────────────────────────

export function useCompanies(params?: CompanyListParams) {
  return useQuery({
    queryKey: companyKeys.list(params),
    queryFn: () => companiesApi.list(params),
    staleTime: 60_000,
  });
}

export function useCreateCompany() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateClientOrganizationPayload) =>
      companiesApi.create(payload),
    onSuccess: (newOrg: ClientOrganization) => {
      qc.invalidateQueries({ queryKey: companyKeys.lists() });
      return newOrg;
    },
  });
}

// ── COMPANY ADMIN ─────────────────────────────────────────────────────────────

export function useMyOrganization() {
  return useQuery({
    queryKey: companyKeys.me(),
    queryFn: () => companiesApi.getMe(),
    staleTime: 120_000,
  });
}

export function useOrgEmployees(params?: { page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: companyKeys.employees(),
    queryFn: () => companiesApi.listEmployees(params),
    staleTime: 60_000,
  });
}

export function useEmployeeRedemptions(customerId: string) {
  return useQuery({
    queryKey: companyKeys.employeeRedemptions(customerId),
    queryFn: () => companiesApi.getEmployeeRedemptions(customerId),
    enabled: !!customerId,
    staleTime: 60_000,
  });
}

export function useOrgRedemptions(params?: { page?: number; pageSize?: number }) {
  return useQuery({
    queryKey: companyKeys.orgRedemptions(),
    queryFn: () => companiesApi.getOrgRedemptions(params),
    staleTime: 60_000,
  });
}
