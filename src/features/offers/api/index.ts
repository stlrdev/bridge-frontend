import { get, post, put, del } from "@/core/api/client";
import { PaginatedResponse } from "@/core/types";
import {
  Campaign,
  CampaignStats,
  CampaignsListParams,
  CreateCampaignPayload,
  Offer,
  UpdateCampaignPayload,
} from "../types";

// ── MERCHANT MANAGER ──────────────────────────────────────────────────────────

export const campaignsApi = {
  list: (merchantId: string, params?: CampaignsListParams) =>
    get<PaginatedResponse<Campaign>>(`/campaigns/merchants/${merchantId}/campaigns/`, {
      params,
    }),

  getById: (merchantId: string, campaignId: string) =>
    get<Campaign>(`/campaigns/merchants/${merchantId}/campaigns/${campaignId}/`),

  create: (merchantId: string, payload: CreateCampaignPayload) =>
    post<Campaign>(`/campaigns/merchants/${merchantId}/campaigns/`, payload),

  update: (merchantId: string, campaignId: string, payload: UpdateCampaignPayload) =>
    put<Campaign>(`/campaigns/merchants/${merchantId}/campaigns/${campaignId}/`, payload),

  delete: (merchantId: string, campaignId: string) =>
    del<void>(`/campaigns/merchants/${merchantId}/campaigns/${campaignId}/`),

  activate: (merchantId: string, campaignId: string) =>
    post<Campaign>(`/campaigns/merchants/${merchantId}/campaigns/${campaignId}/activate/`),

  pause: (merchantId: string, campaignId: string) =>
    post<Campaign>(`/campaigns/merchants/${merchantId}/campaigns/${campaignId}/pause/`),

  complete: (merchantId: string, campaignId: string) =>
    post<Campaign>(`/campaigns/merchants/${merchantId}/campaigns/${campaignId}/complete/`),

  cancel: (merchantId: string, campaignId: string) =>
    post<Campaign>(`/campaigns/merchants/${merchantId}/campaigns/${campaignId}/cancel/`),

  schedule: (merchantId: string, campaignId: string) =>
    post<Campaign>(`/campaigns/merchants/${merchantId}/campaigns/${campaignId}/schedule/`),

  getStats: (merchantId: string, campaignId: string) =>
    get<CampaignStats>(`/campaigns/merchants/${merchantId}/campaigns/${campaignId}/stats/`),
};

// ── COMPANY ADMIN (client org offer management) ───────────────────────────────

export const orgOffersApi = {
  list: () =>
    get<PaginatedResponse<Offer>>("/clients/me/offers/"),

  enableCampaign: (campaignId: string) =>
    post<void>(`/clients/me/offers/campaigns/${campaignId}/enable/`),

  disableCampaign: (campaignId: string) =>
    post<void>(`/clients/me/offers/campaigns/${campaignId}/disable/`),

  enableVoucher: (voucherId: string) =>
    post<void>(`/clients/me/offers/vouchers/${voucherId}/enable/`),

  disableVoucher: (voucherId: string) =>
    post<void>(`/clients/me/offers/vouchers/${voucherId}/disable/`),
};

// Legacy alias for any existing pages that still import offersApi
export const offersApi = orgOffersApi;
