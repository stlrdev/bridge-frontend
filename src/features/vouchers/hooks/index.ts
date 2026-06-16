import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { Voucher, VouchersListParams } from "../types";
import { vouchersApi } from "../api";
import { PaginatedResponse } from "@/core/types";
import { invalidate } from "@/core/query/invalidation";

export const vouchersKeys = {
  all: ["vouchers"] as const,
  lists: () => [...vouchersKeys.all, "list"] as const,
  list: (params?: VouchersListParams) =>
    [...vouchersKeys.lists(), params] as const,
  infiniteHistory: (params?: Omit<VouchersListParams, "page">) =>
    [...vouchersKeys.all, "infinite-history", params] as const,
  history: (params?: VouchersListParams) =>
    [...vouchersKeys.all, "history", params] as const,
};

export function useVouchers(params?: VouchersListParams) {
  return useQuery({
    queryKey: vouchersKeys.list(params),
    queryFn: () => vouchersApi.list(params),
    staleTime: 30_000,
  });
}

type InfiniteVouchersParams = Omit<VouchersListParams, "page">;

function historyInfiniteFetcher(params?: InfiniteVouchersParams) {
  return ({ pageParam }: { pageParam: number }) => {
    return vouchersApi.list({ ...params, page: pageParam, pageSize: 10 });
  };
}

export function useVouchersHistoryInfinite(params?: InfiniteVouchersParams) {
  return useSuspenseInfiniteQuery({
    queryKey: vouchersKeys.infiniteHistory(params),
    queryFn: historyInfiniteFetcher(params),
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedResponse<Voucher>) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    staleTime: 60_000,
  });
}

export function useVouchersHistoryInfiniteDeferred(
  params?: InfiniteVouchersParams,
) {
  return useInfiniteQuery({
    queryKey: vouchersKeys.infiniteHistory(params),
    queryFn: historyInfiniteFetcher(params),
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedResponse<Voucher>) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    staleTime: 60_000,
  });
}

export function useVoucherHistory(params: VouchersListParams) {
  return useQuery({
    queryKey: vouchersKeys.history(params),
    queryFn: () => vouchersApi.getHistory(params),
    staleTime: 60_000,
  });
}

export function generateVoucher() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: vouchersApi.generate,
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: vouchersKeys.all });
      const previousHistory = qc.getQueriesData<Voucher[]>({
        queryKey: vouchersKeys.all,
      });
      return { previousHistory };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousHistory) {
        for (const [queryKey, data] of context.previousHistory)
          qc.setQueryData(queryKey, data);
      }
    },
    onSettled: () => invalidate.voucherGenerated(qc),
  });
}

export function useValidateVoucher() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: vouchersApi.validate,
    onMutate: async (code) => {
      await qc.cancelQueries({ queryKey: vouchersKeys.all });
      const previousData = qc.getQueriesData({ queryKey: vouchersKeys.all });
      qc.setQueriesData<PaginatedResponse<Voucher>>(
        {
          queryKey: vouchersKeys.all,
        },
        (old) => {
          if (!old || !("data" in old)) return old;
          return {
            ...old,
            data: old.data.map((v: Voucher) =>
              v.code === code
                ? {
                    ...v,
                    status: "REDEEMED" as const,
                    redeemedAt: new Date().toISOString(),
                  }
                : v,
            ),
          };
        },
      );
      return { previousData };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousData) {
        for (const [queryKey, data] of context.previousData)
          qc.setQueryData(queryKey, data);
      }
    },
    onSettled: () => invalidate.voucherValidated(qc),
  });
}
