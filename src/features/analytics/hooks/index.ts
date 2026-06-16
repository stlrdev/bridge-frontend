import { useQuery } from "@tanstack/react-query";
import { AnalyticsDateParams } from "../types";
import { adminAnalyticsApi, merchantAnalyticsApi } from "../api";

export const analyticsKeys = {
  all: ["analytics"] as const,
  admin: {
    redemptions: (params?: AnalyticsDateParams) =>
      [...analyticsKeys.all, "admin", "redemptions", params] as const,
    trend: (params?: AnalyticsDateParams) =>
      [...analyticsKeys.all, "admin", "trend", params] as const,
    byType: (params?: AnalyticsDateParams) =>
      [...analyticsKeys.all, "admin", "by-type", params] as const,
    topVouchers: (params?: AnalyticsDateParams) =>
      [...analyticsKeys.all, "admin", "top-vouchers", params] as const,
    topMerchants: (params?: AnalyticsDateParams) =>
      [...analyticsKeys.all, "admin", "top-merchants", params] as const,
    peakTimes: (params?: AnalyticsDateParams) =>
      [...analyticsKeys.all, "admin", "peak-times", params] as const,
    customers: (params?: AnalyticsDateParams) =>
      [...analyticsKeys.all, "admin", "customers", params] as const,
  },
  merchant: (merchantId: string) => ({
    redemptions: (params?: AnalyticsDateParams) =>
      [...analyticsKeys.all, "merchant", merchantId, "redemptions", params] as const,
    trend: (params?: AnalyticsDateParams) =>
      [...analyticsKeys.all, "merchant", merchantId, "trend", params] as const,
    topVouchers: (params?: AnalyticsDateParams) =>
      [...analyticsKeys.all, "merchant", merchantId, "top-vouchers", params] as const,
    campaign: (campaignId: string) =>
      [...analyticsKeys.all, "merchant", merchantId, "campaign", campaignId] as const,
  }),
};

// ── STLR ADMIN ────────────────────────────────────────────────────────────────

export function useAdminRedemptions(params?: AnalyticsDateParams) {
  return useQuery({
    queryKey: analyticsKeys.admin.redemptions(params),
    queryFn: () => adminAnalyticsApi.getRedemptions(params),
    staleTime: 300_000,
  });
}

export function useAdminRedemptionTrend(params?: AnalyticsDateParams) {
  return useQuery({
    queryKey: analyticsKeys.admin.trend(params),
    queryFn: () => adminAnalyticsApi.getRedemptionTrend(params),
    staleTime: 300_000,
  });
}

export function useAdminTopVouchers(params?: AnalyticsDateParams) {
  return useQuery({
    queryKey: analyticsKeys.admin.topVouchers(params),
    queryFn: () => adminAnalyticsApi.getTopVouchers(params),
    staleTime: 300_000,
  });
}

export function useAdminTopMerchants(params?: AnalyticsDateParams) {
  return useQuery({
    queryKey: analyticsKeys.admin.topMerchants(params),
    queryFn: () => adminAnalyticsApi.getTopMerchants(params),
    staleTime: 300_000,
  });
}

export function useAdminCustomerInsights(params?: AnalyticsDateParams) {
  return useQuery({
    queryKey: analyticsKeys.admin.customers(params),
    queryFn: () => adminAnalyticsApi.getCustomerInsights(params),
    staleTime: 300_000,
  });
}

// ── MERCHANT MANAGER ──────────────────────────────────────────────────────────

export function useMerchantRedemptionAnalytics(
  merchantId: string,
  params?: AnalyticsDateParams,
) {
  return useQuery({
    queryKey: analyticsKeys.merchant(merchantId).redemptions(params),
    queryFn: () => merchantAnalyticsApi.getRedemptions(merchantId, params),
    enabled: !!merchantId,
    staleTime: 300_000,
  });
}

export function useMerchantRedemptionTrend(
  merchantId: string,
  params?: AnalyticsDateParams,
) {
  return useQuery({
    queryKey: analyticsKeys.merchant(merchantId).trend(params),
    queryFn: () => merchantAnalyticsApi.getRedemptionTrend(merchantId, params),
    enabled: !!merchantId,
    staleTime: 300_000,
  });
}

export function useMerchantTopVouchers(
  merchantId: string,
  params?: AnalyticsDateParams,
) {
  return useQuery({
    queryKey: analyticsKeys.merchant(merchantId).topVouchers(params),
    queryFn: () => merchantAnalyticsApi.getTopVouchers(merchantId, params),
    enabled: !!merchantId,
    staleTime: 300_000,
  });
}

export function useCampaignPerformance(merchantId: string, campaignId: string) {
  return useQuery({
    queryKey: analyticsKeys.merchant(merchantId).campaign(campaignId),
    queryFn: () => merchantAnalyticsApi.getCampaignPerformance(campaignId),
    enabled: !!merchantId && !!campaignId,
    staleTime: 300_000,
  });
}
