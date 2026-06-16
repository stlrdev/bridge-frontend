import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import {
  Voucher,
  VoucherBatch,
  VoucherRedemption,
  VouchersListParams,
  CreateVoucherPayload,
  RedeemVoucherPayload,
  CreateVoucherBatchPayload,
  AssignVoucherPayload,
} from "../types";
import { vouchersApi } from "../api";
import { PaginatedResponse } from "@/core/types";
import { invalidate } from "@/core/query/invalidation";

export const vouchersKeys = {
  all: ["vouchers"] as const,
  lists: () => [...vouchersKeys.all, "list"] as const,
  list: (params?: VouchersListParams) => [...vouchersKeys.lists(), params] as const,
  detail: (id: string) => [...vouchersKeys.all, "detail", id] as const,
  discover: (params?: VouchersListParams) => [...vouchersKeys.all, "discover", params] as const,
  history: (params?: VouchersListParams) => [...vouchersKeys.all, "history", params] as const,
  infiniteHistory: (params?: Omit<VouchersListParams, "page">) =>
    [...vouchersKeys.all, "infinite-history", params] as const,
  merchantVouchers: (merchantId: string, params?: VouchersListParams) =>
    [...vouchersKeys.all, "merchant", merchantId, params] as const,
  merchantBatches: (merchantId: string) =>
    [...vouchersKeys.all, "merchant", merchantId, "batches"] as const,
  merchantRedemptions: (merchantId: string) =>
    [...vouchersKeys.all, "merchant", merchantId, "redemptions"] as const,
  adminAll: (params?: VouchersListParams) => [...vouchersKeys.all, "admin", params] as const,
};

// ── EMPLOYEE ──────────────────────────────────────────────────────────────────

export function useVouchers(params?: VouchersListParams) {
  return useQuery({
    queryKey: vouchersKeys.list(params),
    queryFn: () => vouchersApi.list(params),
    staleTime: 30_000,
  });
}

export function useVoucherById(id: string) {
  return useQuery({
    queryKey: vouchersKeys.detail(id),
    queryFn: () => vouchersApi.getById(id),
    staleTime: 60_000,
  });
}

export function useDiscoverVouchers(params?: VouchersListParams) {
  return useQuery({
    queryKey: vouchersKeys.discover(params),
    queryFn: () => vouchersApi.discover(params),
    staleTime: 60_000,
  });
}

export function useClaimVoucher() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (voucherId: string) => vouchersApi.claim(voucherId),
    onSettled: () => invalidate.voucherClaimed(qc),
  });
}

export function useVoucherHistory(params?: VouchersListParams) {
  return useQuery({
    queryKey: vouchersKeys.history(params),
    queryFn: () => vouchersApi.getHistory(params),
    staleTime: 60_000,
  });
}

type InfiniteVouchersParams = Omit<VouchersListParams, "page">;

function historyInfiniteFetcher(params?: InfiniteVouchersParams) {
  return ({ pageParam }: { pageParam: number }) =>
    vouchersApi.getHistory({ ...params, page: pageParam, pageSize: 10 });
}

export function useVouchersHistoryInfinite(params?: InfiniteVouchersParams) {
  return useSuspenseInfiniteQuery({
    queryKey: vouchersKeys.infiniteHistory(params),
    queryFn: historyInfiniteFetcher(params),
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedResponse<VoucherRedemption>) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    staleTime: 60_000,
  });
}

export function useVouchersHistoryInfiniteDeferred(params?: InfiniteVouchersParams) {
  return useInfiniteQuery({
    queryKey: vouchersKeys.infiniteHistory(params),
    queryFn: historyInfiniteFetcher(params),
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedResponse<VoucherRedemption>) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    staleTime: 60_000,
  });
}

// ── MERCHANT / STAFF ──────────────────────────────────────────────────────────

export function useVerifyVoucher() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => vouchersApi.verify(code),
    onSettled: () => invalidate.voucherValidated(qc),
  });
}

export function useRedeemVoucher() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: RedeemVoucherPayload) => vouchersApi.redeem(payload),
    onSettled: () => invalidate.voucherRedeemed(qc),
  });
}

// ── MERCHANT MANAGER ──────────────────────────────────────────────────────────

export function useMerchantVouchers(merchantId: string, params?: VouchersListParams) {
  return useQuery({
    queryKey: vouchersKeys.merchantVouchers(merchantId, params),
    queryFn: () => vouchersApi.listMerchantVouchers(merchantId, params),
    staleTime: 30_000,
    enabled: !!merchantId,
  });
}

export function useCreateVoucher(merchantId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateVoucherPayload) =>
      vouchersApi.createVoucher(merchantId, payload),
    onSettled: () =>
      qc.invalidateQueries({ queryKey: vouchersKeys.merchantVouchers(merchantId) }),
  });
}

export function useActivateVoucher(merchantId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (voucherId: string) => vouchersApi.activateVoucher(merchantId, voucherId),
    onSettled: () =>
      qc.invalidateQueries({ queryKey: vouchersKeys.merchantVouchers(merchantId) }),
  });
}

export function useAssignVoucher(merchantId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ voucherId, payload }: { voucherId: string; payload: AssignVoucherPayload }) =>
      vouchersApi.assignVoucher(merchantId, voucherId, payload),
    onSettled: (_, __, { voucherId }) =>
      qc.invalidateQueries({ queryKey: vouchersKeys.detail(voucherId) }),
  });
}

export function useMerchantBatches(merchantId: string) {
  return useQuery({
    queryKey: vouchersKeys.merchantBatches(merchantId),
    queryFn: () => vouchersApi.listBatches(merchantId),
    enabled: !!merchantId,
  });
}

export function useCreateBatch(merchantId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateVoucherBatchPayload) =>
      vouchersApi.createBatch(merchantId, payload),
    onSettled: () =>
      qc.invalidateQueries({ queryKey: vouchersKeys.merchantBatches(merchantId) }),
  });
}

export function useGenerateBatch(merchantId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (batchId: string) => vouchersApi.generateBatch(merchantId, batchId),
    onSettled: () =>
      qc.invalidateQueries({ queryKey: vouchersKeys.merchantBatches(merchantId) }),
  });
}

export function useMerchantRedemptions(merchantId: string, params?: VouchersListParams) {
  return useQuery({
    queryKey: vouchersKeys.merchantRedemptions(merchantId),
    queryFn: () => vouchersApi.getMerchantRedemptions(merchantId, params),
    enabled: !!merchantId,
  });
}

// ── STLR ADMIN ────────────────────────────────────────────────────────────────

export function useAdminVouchers(params?: VouchersListParams) {
  return useQuery({
    queryKey: vouchersKeys.adminAll(params),
    queryFn: () => vouchersApi.adminListAll(params),
    staleTime: 30_000,
  });
}

export function useAdminDisableVoucher() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (voucherId: string) => vouchersApi.adminDisable(voucherId),
    onSettled: () => qc.invalidateQueries({ queryKey: vouchersKeys.adminAll() }),
  });
}

// Legacy export aliases
export function generateVoucher() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (voucherId: string) => vouchersApi.claim(voucherId),
    onSettled: () => invalidate.voucherGenerated(qc),
  });
}

export function useValidateVoucher() {
  return useVerifyVoucher();
}
