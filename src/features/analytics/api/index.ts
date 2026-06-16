import { get } from "@/core/api/client";
import {
  AnalyticsDateParams,
  CampaignPerformance,
  CustomerInsights,
  PeakTime,
  RedemptionSummary,
  RedemptionTrendPoint,
  RedemptionsByType,
  TopMerchant,
  TopVoucher,
} from "../types";

// ── STLR ADMIN ────────────────────────────────────────────────────────────────

export const adminAnalyticsApi = {
  getRedemptions: (params?: AnalyticsDateParams) =>
    get<RedemptionSummary>("/analytics/admin/redemptions/", { params }),

  getRedemptionTrend: (params?: AnalyticsDateParams) =>
    get<RedemptionTrendPoint[]>("/analytics/admin/redemptions/trend/", { params }),

  getRedemptionsByType: (params?: AnalyticsDateParams) =>
    get<RedemptionsByType[]>("/analytics/admin/redemptions/by-type/", { params }),

  getTopVouchers: (params?: AnalyticsDateParams) =>
    get<TopVoucher[]>("/analytics/admin/vouchers/top/", { params }),

  getTopMerchants: (params?: AnalyticsDateParams) =>
    get<TopMerchant[]>("/analytics/admin/merchants/top/", { params }),

  getPeakTimes: (params?: AnalyticsDateParams) =>
    get<PeakTime[]>("/analytics/admin/peak-times/", { params }),

  getCustomerInsights: (params?: AnalyticsDateParams) =>
    get<CustomerInsights>("/analytics/admin/customers/", { params }),
};

// ── MERCHANT MANAGER ──────────────────────────────────────────────────────────

export const merchantAnalyticsApi = {
  getRedemptions: (merchantId: string, params?: AnalyticsDateParams) =>
    get<RedemptionSummary>(`/analytics/merchants/${merchantId}/redemptions/`, {
      params,
    }),

  getRedemptionTrend: (merchantId: string, params?: AnalyticsDateParams) =>
    get<RedemptionTrendPoint[]>(
      `/analytics/merchants/${merchantId}/redemptions/trend/`,
      { params },
    ),

  getRedemptionsByType: (merchantId: string, params?: AnalyticsDateParams) =>
    get<RedemptionsByType[]>(
      `/analytics/merchants/${merchantId}/redemptions/by-type/`,
      { params },
    ),

  getTopVouchers: (merchantId: string, params?: AnalyticsDateParams) =>
    get<TopVoucher[]>(`/analytics/merchants/${merchantId}/vouchers/top/`, {
      params,
    }),

  getPeakTimes: (merchantId: string, params?: AnalyticsDateParams) =>
    get<PeakTime[]>(`/analytics/merchants/${merchantId}/peak-times/`, { params }),

  getCustomerInsights: (merchantId: string, params?: AnalyticsDateParams) =>
    get<CustomerInsights>(`/analytics/merchants/${merchantId}/customers/`, {
      params,
    }),

  getCampaignPerformance: (campaignId: string, params?: AnalyticsDateParams) =>
    get<CampaignPerformance>(`/analytics/campaigns/${campaignId}/performance/`, {
      params,
    }),
};
