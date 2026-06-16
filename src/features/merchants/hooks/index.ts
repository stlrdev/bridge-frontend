import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateBranchPayload,
  CreateMerchantPayload,
  MerchantsListParams,
} from "../types";
import { merchantsApi, orgMerchantsApi } from "../api";

export const merchantsKeys = {
  all: ["merchants"] as const,
  lists: () => [...merchantsKeys.all, "list"] as const,
  list: (params?: MerchantsListParams) => [...merchantsKeys.lists(), params] as const,
  detail: (id: string) => [...merchantsKeys.all, "detail", id] as const,
  branches: (merchantId: string) => [...merchantsKeys.all, merchantId, "branches"] as const,
  orgList: () => [...merchantsKeys.all, "org"] as const,
};

// ── STLR ADMIN ────────────────────────────────────────────────────────────────

export function useMerchants(params?: MerchantsListParams) {
  return useQuery({
    queryKey: merchantsKeys.list(params),
    queryFn: () => merchantsApi.list(params),
    staleTime: 60_000,
  });
}

export function useMerchant(merchantId: string) {
  return useQuery({
    queryKey: merchantsKeys.detail(merchantId),
    queryFn: () => merchantsApi.getById(merchantId),
    enabled: !!merchantId,
    staleTime: 120_000,
  });
}

export function useCreateMerchant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateMerchantPayload) => merchantsApi.create(payload),
    onSettled: () => qc.invalidateQueries({ queryKey: merchantsKeys.lists() }),
  });
}

export function useActivateMerchant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (merchantId: string) => merchantsApi.activate(merchantId),
    onSuccess: (_, merchantId) => {
      qc.invalidateQueries({ queryKey: merchantsKeys.detail(merchantId) });
      qc.invalidateQueries({ queryKey: merchantsKeys.lists() });
    },
  });
}

export function useSuspendMerchant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (merchantId: string) => merchantsApi.suspend(merchantId),
    onSuccess: (_, merchantId) => {
      qc.invalidateQueries({ queryKey: merchantsKeys.detail(merchantId) });
      qc.invalidateQueries({ queryKey: merchantsKeys.lists() });
    },
  });
}

export function useMerchantBranches(merchantId: string) {
  return useQuery({
    queryKey: merchantsKeys.branches(merchantId),
    queryFn: () => merchantsApi.listBranches(merchantId),
    enabled: !!merchantId,
    staleTime: 120_000,
  });
}

export function useCreateBranch(merchantId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateBranchPayload) =>
      merchantsApi.createBranch(merchantId, payload),
    onSettled: () =>
      qc.invalidateQueries({ queryKey: merchantsKeys.branches(merchantId) }),
  });
}

// ── COMPANY ADMIN ─────────────────────────────────────────────────────────────

export function useOrgMerchants() {
  return useQuery({
    queryKey: merchantsKeys.orgList(),
    queryFn: () => orgMerchantsApi.list(),
    staleTime: 60_000,
  });
}

export function useEnableOrgMerchant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (merchantId: string) => orgMerchantsApi.enable(merchantId),
    onSettled: () => qc.invalidateQueries({ queryKey: merchantsKeys.orgList() }),
  });
}

export function useDisableOrgMerchant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (merchantId: string) => orgMerchantsApi.disable(merchantId),
    onSettled: () => qc.invalidateQueries({ queryKey: merchantsKeys.orgList() }),
  });
}
